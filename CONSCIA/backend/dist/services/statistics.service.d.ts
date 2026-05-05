import mongoose, { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';
import { Goal } from '../schemas/goal.schema';
export declare class StatisticsService {
    private sessionModel;
    private goalModel;
    constructor(sessionModel: Model<UsageSession>, goalModel: Model<Goal>);
    getScreenTime(userId: string, period: 'daily' | 'weekly' | 'monthly', date: string): Promise<{
        totalDurationMs: number;
        totalDurationMinutes: number;
        totalDurationHours: string;
        sessionCount: number;
        period: "daily" | "weekly" | "monthly";
        date: string;
    }>;
    getTopApps(userId: string, period: 'daily' | 'weekly' | 'monthly', date: string, limit?: number): Promise<{
        period: "daily" | "weekly" | "monthly";
        date: string;
        topApps: any[];
        totalAppsUsed: number;
    }>;
    getUsageByPurpose(userId: string, period: 'daily' | 'weekly' | 'monthly', date: string): Promise<{
        summary: {
            totalSeconds: number;
            purposefulPercentage: number;
            distractingPercentage: number;
        };
        details: {
            tagName: any;
            duration: number;
            percentage: number;
            colorCode: any;
            category: any;
        }[];
    }>;
    getTrend(userId: string, startDate: string, endDate: string): Promise<{
        startDate: string;
        endDate: string;
        trend: {
            date: string;
            durationMs: number;
            durationMinutes: number;
            durationHours: string;
        }[];
    }>;
    getInsights(userId: string, period: 'daily' | 'weekly' | 'monthly', date: string): Promise<{
        period: "daily" | "weekly" | "monthly";
        date: string;
        insights: {
            mostDistractingApp: any;
            peakHour: {
                hour: number;
                duration: any;
            };
            totalSessions: number;
            uniqueApps: number;
        };
    }>;
    getGoalProgress(userId: string): Promise<{
        date: Date;
        goals: {
            goalId: mongoose.Types.ObjectId;
            goalType: string;
            targetValue: number;
            actualValue: number;
            progress: string;
            status: string;
            appInfo: string | null;
        }[];
    }>;
    private getStartDate;
}
