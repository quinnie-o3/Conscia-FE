"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const usage_session_schema_1 = require("../schemas/usage-session.schema");
const goal_schema_1 = require("../schemas/goal.schema");
let StatisticsService = class StatisticsService {
    sessionModel;
    goalModel;
    constructor(sessionModel, goalModel) {
        this.sessionModel = sessionModel;
        this.goalModel = goalModel;
    }
    async getScreenTime(userId, period, date) {
        const startDate = this.getStartDate(period, new Date(date));
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const sessions = await this.sessionModel
            .find({
            userId,
            sessionDate: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .exec();
        const totalDuration = sessions.reduce((sum, session) => sum + ((session.durationSeconds || 0) * 1000), 0);
        return {
            totalDurationMs: totalDuration,
            totalDurationMinutes: Math.round(totalDuration / 1000 / 60),
            totalDurationHours: (totalDuration / 1000 / 60 / 60).toFixed(2),
            sessionCount: sessions.length,
            period,
            date,
        };
    }
    async getTopApps(userId, period, date, limit = 5) {
        const startDate = this.getStartDate(period, new Date(date));
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const sessions = await this.sessionModel
            .find({
            userId,
            sessionDate: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('appId', 'appName packageName category')
            .exec();
        const appUsage = {};
        sessions.forEach((session) => {
            const populatedApp = session.appId;
            const appId = populatedApp?._id?.toString() || 'unknown';
            const appName = populatedApp?.appName || 'Unknown App';
            if (!appUsage[appId]) {
                appUsage[appId] = {
                    appId,
                    appName,
                    totalDuration: 0,
                    sessionCount: 0,
                };
            }
            appUsage[appId].totalDuration += (session.durationSeconds || 0) * 1000;
            appUsage[appId].sessionCount += 1;
        });
        const totalDuration = Object.values(appUsage).reduce((sum, app) => sum + app.totalDuration, 0);
        const topApps = Object.values(appUsage)
            .map((app) => ({
            ...app,
            percentage: totalDuration > 0 ? ((app.totalDuration / totalDuration) * 100).toFixed(2) : 0,
            durationMinutes: Math.round(app.totalDuration / 1000 / 60),
            durationHours: (app.totalDuration / 1000 / 60 / 60).toFixed(2),
        }))
            .sort((a, b) => b.totalDuration - a.totalDuration)
            .slice(0, limit);
        return {
            period,
            date,
            topApps,
            totalAppsUsed: Object.keys(appUsage).length,
        };
    }
    async getUsageByPurpose(userId, period, date) {
        const startDate = this.getStartDate(period, new Date(date));
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const pipeline = [
            {
                $match: {
                    userId: new mongoose_2.default.Types.ObjectId(userId),
                    sessionDate: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $unwind: {
                    path: '$tags',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    tagName: {
                        $cond: {
                            if: { $gt: [{ $size: { $ifNull: ['$tags', []] } }, 0] },
                            then: '$tags.tagName',
                            else: 'Unclassified',
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'purposetags',
                    localField: 'tagName',
                    foreignField: 'tagName',
                    as: 'tagInfo',
                },
            },
            {
                $addFields: {
                    category: {
                        $cond: {
                            if: { $gt: [{ $size: '$tagInfo' }, 0] },
                            then: { $arrayElemAt: ['$tagInfo.category', 0] },
                            else: 'NEUTRAL',
                        },
                    },
                    colorCode: {
                        $cond: {
                            if: { $gt: [{ $size: '$tagInfo' }, 0] },
                            then: { $arrayElemAt: ['$tagInfo.colorCode', 0] },
                            else: '#999999',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: {
                        tagName: '$tagName',
                        category: '$category',
                        colorCode: '$colorCode',
                    },
                    totalDurationSeconds: { $sum: '$durationSeconds' },
                },
            },
            {
                $project: {
                    _id: 0,
                    tagName: '$_id.tagName',
                    category: '$_id.category',
                    colorCode: '$_id.colorCode',
                    totalDurationSeconds: 1,
                },
            },
            {
                $sort: { totalDurationSeconds: -1 },
            },
        ];
        const results = await this.sessionModel.aggregate(pipeline).exec();
        const totalSeconds = results.reduce((sum, item) => sum + (item.totalDurationSeconds || 0), 0);
        const purposefulSeconds = results
            .filter((item) => item.category === 'PURPOSEFUL')
            .reduce((sum, item) => sum + (item.totalDurationSeconds || 0), 0);
        const distractingSeconds = results
            .filter((item) => item.category === 'DISTRACTING')
            .reduce((sum, item) => sum + (item.totalDurationSeconds || 0), 0);
        const details = results.map((item) => ({
            tagName: item.tagName,
            duration: Math.round(item.totalDurationSeconds),
            percentage: totalSeconds > 0
                ? Number(((item.totalDurationSeconds / totalSeconds) * 100).toFixed(1))
                : 0,
            colorCode: item.colorCode || '#999999',
            category: item.category,
        }));
        return {
            summary: {
                totalSeconds: Math.round(totalSeconds),
                purposefulPercentage: totalSeconds > 0 ? Number(((purposefulSeconds / totalSeconds) * 100).toFixed(1)) : 0,
                distractingPercentage: totalSeconds > 0 ? Number(((distractingSeconds / totalSeconds) * 100).toFixed(1)) : 0,
            },
            details,
        };
    }
    async getTrend(userId, startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const sessions = await this.sessionModel
            .find({
            userId,
            sessionDate: {
                $gte: start,
                $lte: end,
            },
        })
            .exec();
        const trendData = {};
        const currentDate = new Date(start);
        while (currentDate <= end) {
            const dateKey = currentDate.toISOString().split('T')[0];
            trendData[dateKey] = 0;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        sessions.forEach((session) => {
            const dateKey = session.sessionDate.toISOString().split('T')[0];
            trendData[dateKey] = (trendData[dateKey] || 0) + ((session.durationSeconds || 0) * 1000);
        });
        const trend = Object.entries(trendData).map(([date, duration]) => ({
            date,
            durationMs: duration,
            durationMinutes: Math.round(duration / 1000 / 60),
            durationHours: (duration / 1000 / 60 / 60).toFixed(2),
        }));
        return {
            startDate,
            endDate,
            trend,
        };
    }
    async getInsights(userId, period, date) {
        const startDate = this.getStartDate(period, new Date(date));
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        const sessions = await this.sessionModel
            .find({
            userId,
            sessionDate: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .populate('appId', 'appName')
            .exec();
        const appUsage = {};
        const hourUsage = {};
        sessions.forEach((session) => {
            const populatedApp = session.appId;
            const appId = populatedApp?._id?.toString() || 'unknown';
            const appName = populatedApp?.appName || 'Unknown App';
            const hour = new Date(session.startedAt).getHours();
            if (!appUsage[appId]) {
                appUsage[appId] = {
                    appName,
                    duration: 0,
                    count: 0,
                };
            }
            appUsage[appId].duration += (session.durationSeconds || 0) * 1000;
            appUsage[appId].count += 1;
            hourUsage[hour] = (hourUsage[hour] || 0) + ((session.durationSeconds || 0) * 1000);
        });
        const mostDistractingApp = Object.entries(appUsage)
            .map(([_, app]) => app)
            .sort((a, b) => b.duration - a.duration)[0];
        const peakHour = Object.entries(hourUsage)
            .map(([hour, duration]) => ({ hour: parseInt(hour), duration }))
            .sort((a, b) => b.duration - a.duration)[0];
        return {
            period,
            date,
            insights: {
                mostDistractingApp: mostDistractingApp || null,
                peakHour: peakHour || null,
                totalSessions: sessions.length,
                uniqueApps: Object.keys(appUsage).length,
            },
        };
    }
    async getGoalProgress(userId) {
        const goals = await this.goalModel
            .find({ userId, status: 'ACTIVE' })
            .populate('appId', 'appName packageName')
            .exec();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);
        const progressData = await Promise.all(goals.map(async (goal) => {
            const sessions = await this.sessionModel
                .find({
                userId,
                sessionDate: {
                    $gte: today,
                    $lte: endOfDay,
                },
                ...(goal.appId && { appId: goal.appId }),
            })
                .exec();
            const actualValue = sessions.reduce((sum, session) => sum + ((session.durationSeconds || 0) * 1000), 0);
            const actualMinutes = Math.round(actualValue / 1000 / 60);
            const targetValue = goal.targetValue || 0;
            const progress = targetValue > 0 ? (actualMinutes / targetValue) * 100 : 0;
            const exceeded = actualMinutes > targetValue;
            return {
                goalId: goal._id,
                goalType: goal.goalType,
                targetValue,
                actualValue: actualMinutes,
                progress: progress.toFixed(2),
                status: exceeded ? 'EXCEEDED' : 'ON_TRACK',
                appInfo: goal.appId || null,
            };
        }));
        return {
            date: today,
            goals: progressData,
        };
    }
    getStartDate(period, date) {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        if (period === 'daily') {
            return startDate;
        }
        else if (period === 'weekly') {
            const day = startDate.getDay();
            const diff = startDate.getDate() - day;
            startDate.setDate(diff);
            return startDate;
        }
        else if (period === 'monthly') {
            startDate.setDate(1);
            return startDate;
        }
        return startDate;
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usage_session_schema_1.UsageSession.name)),
    __param(1, (0, mongoose_1.InjectModel)(goal_schema_1.Goal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map