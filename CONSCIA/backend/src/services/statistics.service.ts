import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';
import { Goal } from '../schemas/goal.schema';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel(UsageSession.name)
        private sessionModel: Model<UsageSession>,
        @InjectModel(Goal.name) private goalModel: Model<Goal>,
    ) { }

    async getScreenTime(
        userId: string,
        period: 'daily' | 'weekly' | 'monthly',
        date: string,
    ) {
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

    async getTopApps(
        userId: string,
        period: 'daily' | 'weekly' | 'monthly',
        date: string,
        limit: number = 5,
    ) {
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

        const appUsage: { [key: string]: any } = {};

        sessions.forEach((session) => {
            const populatedApp = session.appId as any;
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

        const totalDuration = Object.values(appUsage).reduce(
            (sum: number, app: any) => sum + app.totalDuration,
            0,
        );

        const topApps = Object.values(appUsage)
            .map((app: any) => ({
                ...app,
                percentage: totalDuration > 0 ? ((app.totalDuration / totalDuration) * 100).toFixed(2) : 0,
                durationMinutes: Math.round(app.totalDuration / 1000 / 60),
                durationHours: (app.totalDuration / 1000 / 60 / 60).toFixed(2),
            }))
            .sort((a: any, b: any) => b.totalDuration - a.totalDuration)
            .slice(0, limit);

        return {
            period,
            date,
            topApps,
            totalAppsUsed: Object.keys(appUsage).length,
        };
    }

    async getUsageByPurpose(
        userId: string,
        period: 'daily' | 'weekly' | 'monthly',
        date: string,
    ) {
        const startDate = this.getStartDate(period, new Date(date));
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const pipeline = [
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
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
        const totalSeconds = results.reduce((sum: number, item: any) => sum + (item.totalDurationSeconds || 0), 0);
        const purposefulSeconds = results
            .filter((item: any) => item.category === 'PURPOSEFUL')
            .reduce((sum: number, item: any) => sum + (item.totalDurationSeconds || 0), 0);
        const distractingSeconds = results
            .filter((item: any) => item.category === 'DISTRACTING')
            .reduce((sum: number, item: any) => sum + (item.totalDurationSeconds || 0), 0);

        const details = results.map((item: any) => ({
            tagName: item.tagName,
            duration: Math.round(item.totalDurationSeconds),
            percentage:
                totalSeconds > 0
                    ? Number(((item.totalDurationSeconds / totalSeconds) * 100).toFixed(1))
                    : 0,
            colorCode: item.colorCode || '#999999',
            category: item.category,
        }));

        return {
            summary: {
                totalSeconds: Math.round(totalSeconds),
                purposefulPercentage:
                    totalSeconds > 0 ? Number(((purposefulSeconds / totalSeconds) * 100).toFixed(1)) : 0,
                distractingPercentage:
                    totalSeconds > 0 ? Number(((distractingSeconds / totalSeconds) * 100).toFixed(1)) : 0,
            },
            details,
        };
    }

    async getTrend(
        userId: string,
        startDate: string,
        endDate: string,
    ) {
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

        const trendData: { [key: string]: number } = {};

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

    async getInsights(
        userId: string,
        period: 'daily' | 'weekly' | 'monthly',
        date: string,
    ) {
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

        const appUsage: { [key: string]: any } = {};
        const hourUsage: { [key: number]: number } = {};

        sessions.forEach((session) => {
            const populatedApp = session.appId as any;
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
            .map(([_, app]: any) => app)
            .sort((a: any, b: any) => b.duration - a.duration)[0];

        const peakHour = Object.entries(hourUsage)
            .map(([hour, duration]: any) => ({ hour: parseInt(hour), duration }))
            .sort((a: any, b: any) => b.duration - a.duration)[0];

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

    async getGoalProgress(userId: string) {
        const goals = await this.goalModel
            .find({ userId, status: 'ACTIVE' })
            .populate('appId', 'appName packageName')
            .exec();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const progressData = await Promise.all(
            goals.map(async (goal) => {

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
            }),
        );

        return {
            date: today,
            goals: progressData,
        };
    }

    private getStartDate(period: 'daily' | 'weekly' | 'monthly', date: Date): Date {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        if (period === 'daily') {
            return startDate;
        } else if (period === 'weekly') {
            const day = startDate.getDay();
            const diff = startDate.getDate() - day;
            startDate.setDate(diff);
            return startDate;
        } else if (period === 'monthly') {
            startDate.setDate(1);
            return startDate;
        }

        return startDate;
    }
}