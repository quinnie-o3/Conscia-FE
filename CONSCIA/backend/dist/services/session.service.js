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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const usage_session_schema_1 = require("../schemas/usage-session.schema");
const purpose_tag_schema_1 = require("../schemas/purpose-tag.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let SessionService = class SessionService {
    sessionModel;
    tagModel;
    constructor(sessionModel, tagModel) {
        this.sessionModel = sessionModel;
        this.tagModel = tagModel;
    }
    async createSession(userId, sessionData) {
        const { deviceId, appId, startedAt, endedAt, date } = sessionData;
        const duration = new Date(endedAt).getTime() - new Date(startedAt).getTime();
        const newSession = await this.sessionModel.create({
            userId,
            deviceId,
            appId,
            startedAt: new Date(startedAt),
            endedAt: new Date(endedAt),
            durationSeconds: Math.floor(duration / 1000),
            sessionDate: new Date(date),
            createdAt: new Date(),
        });
        return newSession;
    }
    async createSessionsBatch(userId, sessionsList) {
        try {
            const sessionsToCreate = sessionsList.map((session) => {
                const duration = new Date(session.endedAt).getTime() -
                    new Date(session.startedAt).getTime();
                return {
                    userId,
                    deviceId: session.deviceId,
                    appId: session.appId,
                    startedAt: new Date(session.startedAt),
                    endedAt: new Date(session.endedAt),
                    durationSeconds: Math.floor(duration / 1000),
                    sessionDate: new Date(session.date),
                    createdAt: new Date(),
                };
            });
            const createdSessions = await this.sessionModel.insertMany(sessionsToCreate);
            return createdSessions;
        }
        catch (error) {
            throw new Error(`Failed to create batch sessions: ${error.message}`);
        }
    }
    async syncSessions(userId, dto) {
        try {
            const sessionsToCreate = dto.sessions.map((session) => {
                const startedAt = new Date(session.startedAt);
                const endedAt = new Date(session.endedAt);
                const sessionDate = new Date(startedAt);
                sessionDate.setHours(0, 0, 0, 0);
                const tagsObj = Array.isArray(session.tags)
                    ? session.tags.map((t) => (typeof t === 'string' ? { tagName: t } : t))
                    : [];
                return {
                    userId,
                    externalId: session.externalId || `${userId}_${session.packageName || 'unknown'}_${session.startedAt}`,
                    deviceId: session.deviceId,
                    packageName: session.packageName,
                    appName: session.appName,
                    startedAt,
                    endedAt,
                    sessionDate,
                    durationSeconds: session.durationSeconds,
                    isClassified: session.isClassified || false,
                    tags: tagsObj,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });
            const createdSessions = await this.sessionModel.insertMany(sessionsToCreate, {
                ordered: false,
            });
            return { count: createdSessions.length };
        }
        catch (error) {
            if (error?.code === 11000 && error?.result?.nInserted != null) {
                return { count: error.result.nInserted };
            }
            throw new Error(`Failed to sync sessions: ${error.message}`);
        }
    }
    async getUsageByPurpose(userId, query) {
        const period = query.period || 'daily';
        const date = query.date ? new Date(query.date) : new Date();
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
            { $sort: { totalDurationSeconds: -1 } },
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
                purposefulPercentage: totalSeconds > 0
                    ? Number(((purposefulSeconds / totalSeconds) * 100).toFixed(1))
                    : 0,
                distractingPercentage: totalSeconds > 0
                    ? Number(((distractingSeconds / totalSeconds) * 100).toFixed(1))
                    : 0,
            },
            details,
        };
    }
    getStartDate(period, date) {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        if (period === 'daily') {
            return startDate;
        }
        if (period === 'weekly') {
            const day = startDate.getDay();
            const diff = startDate.getDate() - day;
            startDate.setDate(diff);
            return startDate;
        }
        if (period === 'monthly') {
            startDate.setDate(1);
            return startDate;
        }
        return startDate;
    }
    async getPurposeInsights(userId, fromStr, toStr) {
        const from = new Date(fromStr);
        const to = new Date(toStr);
        const pipeline = [
            {
                $match: {
                    userId: new mongoose_2.default.Types.ObjectId(userId),
                    startedAt: { $lt: to },
                    endedAt: { $gt: from },
                },
            },
            {
                $addFields: {
                    effectiveStart: { $max: ['$startedAt', from] },
                    effectiveEnd: { $min: ['$endedAt', to] },
                    tagsArray: {
                        $cond: {
                            if: { $and: [{ $isArray: '$tags' }, { $gt: [{ $size: '$tags' }, 0] }] },
                            then: '$tags',
                            else: [{ tagName: 'Other' }],
                        },
                    },
                },
            },
            {
                $addFields: {
                    effectiveDurationSecs: {
                        $max: [
                            0,
                            { $divide: [{ $subtract: ['$effectiveEnd', '$effectiveStart'] }, 1000] },
                        ],
                    },
                    numTags: { $size: '$tagsArray' },
                },
            },
            {
                $unwind: '$tagsArray',
            },
            {
                $addFields: {
                    tagWeight: {
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: [{ $type: '$tagsArray' }, 'object'] },
                                    { $isNumber: '$tagsArray.weight' },
                                ],
                            },
                            then: '$tagsArray.weight',
                            else: { $divide: [1, '$numTags'] },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'purposetags',
                    localField: 'tagsArray.tagName',
                    foreignField: 'tagName',
                    as: 'tagInfo',
                },
            },
            {
                $group: {
                    _id: {
                        tagName: {
                            $cond: {
                                if: { $eq: [{ $type: '$tagsArray' }, 'string'] },
                                then: '$tagsArray',
                                else: { $ifNull: ['$tagsArray.tagName', 'Other'] },
                            },
                        },
                        category: {
                            $cond: {
                                if: { $gt: [{ $size: '$tagInfo' }, 0] },
                                then: { $arrayElemAt: ['$tagInfo.category', 0] },
                                else: 'NEUTRAL',
                            },
                        },
                    },
                    totalDurationSeconds: {
                        $sum: { $multiply: ['$effectiveDurationSecs', '$tagWeight'] },
                    },
                },
            },
        ];
        const aggResults = await this.sessionModel.aggregate(pipeline).exec();
        let totalDurationSeconds = 0;
        const categoryStats = new Map();
        const formattedTags = [];
        for (const res of aggResults) {
            const tagName = res._id.tagName;
            const category = res._id.category || 'NEUTRAL';
            const duration = res.totalDurationSeconds || 0;
            totalDurationSeconds += duration;
            categoryStats.set(category, (categoryStats.get(category) || 0) + duration);
            formattedTags.push({
                tagName,
                category,
                totalDurationSeconds: Math.round(duration),
                percentage: 0,
            });
        }
        for (const tag of formattedTags) {
            tag.percentage =
                totalDurationSeconds > 0
                    ? Number(((tag.totalDurationSeconds / totalDurationSeconds) * 100).toFixed(1))
                    : 0;
        }
        const categories = [];
        for (const [category, duration] of categoryStats.entries()) {
            categories.push({
                category,
                totalDurationSeconds: Math.round(duration),
                percentage: totalDurationSeconds > 0
                    ? Number(((duration / totalDurationSeconds) * 100).toFixed(1))
                    : 0,
            });
        }
        const purposefulDuration = categoryStats.get('PURPOSEFUL') || 0;
        const distractingDuration = categoryStats.get('DISTRACTING') || 0;
        return {
            totalDurationSeconds: Math.round(totalDurationSeconds),
            purposefulPercentage: totalDurationSeconds > 0
                ? Number(((purposefulDuration / totalDurationSeconds) * 100).toFixed(1))
                : 0,
            distractingPercentage: totalDurationSeconds > 0
                ? Number(((distractingDuration / totalDurationSeconds) * 100).toFixed(1))
                : 0,
            categories: categories.sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds),
            tags: formattedTags.sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds),
        };
    }
    async getSessionsByUserId(userId, filters) {
        const query = { userId };
        const page = filters?.page || 1;
        const limit = filters?.limit || 20;
        const skip = (page - 1) * limit;
        if (filters?.dateFrom || filters?.dateTo) {
            query.sessionDate = {};
            if (filters.dateFrom) {
                query.sessionDate.$gte = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                query.sessionDate.$lte = new Date(filters.dateTo);
            }
        }
        if (filters?.appId) {
            query.appId = filters.appId;
        }
        if (filters?.status === 'classified') {
            query.tags = { $exists: true, $ne: [] };
        }
        else if (filters?.status === 'unclassified') {
            query.$or = [{ tags: { $exists: false } }, { tags: [] }];
        }
        const total = await this.sessionModel.countDocuments(query);
        const sessions = await this.sessionModel
            .find(query)
            .populate('appId', 'appName packageName category')
            .sort({ sessionDate: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return {
            data: sessions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getSessionsByDate(userId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const sessions = await this.sessionModel
            .find({
            userId,
            sessionDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
            .populate('appId', 'appName packageName category')
            .sort({ startedAt: 1 })
            .exec();
        return sessions;
    }
    async getUnclassifiedSessions(userId) {
        const sessions = await this.sessionModel
            .find({
            userId,
            $or: [{ tags: { $exists: false } }, { tags: { $size: 0 } }],
        })
            .populate('appId', 'appName packageName category')
            .sort({ sessionDate: -1 })
            .exec();
        return sessions;
    }
    async getSessionById(sessionId) {
        if (!sessionId) {
            throw new custom_exceptions_1.InvalidInputException('sessionId', 'Session ID is required');
        }
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session) {
            throw new custom_exceptions_1.SessionNotFoundException(sessionId);
        }
        return session;
    }
    async updateSession(sessionId, updateData) {
        const session = await this.sessionModel
            .findByIdAndUpdate(sessionId, updateData, { new: true })
            .populate('appId', 'appName packageName category')
            .exec();
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }
    async classifySession(sessionId, classifyData) {
        const { tags, note } = classifyData;
        const session = await this.sessionModel
            .findByIdAndUpdate(sessionId, {
            tags: Array.isArray(tags) ? tags : [tags],
            note,
            classifiedAt: new Date(),
        }, { new: true })
            .populate('appId', 'appName packageName category')
            .exec();
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }
    async deleteSession(sessionId) {
        const session = await this.sessionModel
            .findByIdAndDelete(sessionId)
            .exec();
        if (!session) {
            throw new custom_exceptions_1.SessionNotFoundException(sessionId);
        }
        return session;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usage_session_schema_1.UsageSession.name)),
    __param(1, (0, mongoose_1.InjectModel)(purpose_tag_schema_1.PurposeTag.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SessionService);
//# sourceMappingURL=session.service.js.map