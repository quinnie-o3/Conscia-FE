import { StatisticsService } from '../services/statistics.service';
import { ScreenTimeQueryDto, TopAppsQueryDto, UsageByPurposeQueryDto, TrendQueryDto, InsightsQueryDto } from '../dtos/stats.dto';
export declare class StatisticsController {
    private statisticsService;
    constructor(statisticsService: StatisticsService);
    getScreenTime(query: ScreenTimeQueryDto, user: any): Promise<{
        success: boolean;
        data: {
            totalDurationMs: number;
            totalDurationMinutes: number;
            totalDurationHours: string;
            sessionCount: number;
            period: "daily" | "weekly" | "monthly";
            date: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getTopApps(query: TopAppsQueryDto, user: any): Promise<{
        success: boolean;
        data: {
            period: "daily" | "weekly" | "monthly";
            date: string;
            topApps: any[];
            totalAppsUsed: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getUsageByPurpose(query: UsageByPurposeQueryDto, user: any): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getTrend(query: TrendQueryDto, user: any): Promise<{
        success: boolean;
        data: {
            startDate: string;
            endDate: string;
            trend: {
                date: string;
                durationMs: number;
                durationMinutes: number;
                durationHours: string;
            }[];
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getInsights(query: InsightsQueryDto, user: any): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getGoalProgress(user: any): Promise<{
        success: boolean;
        data: {
            date: Date;
            goals: {
                goalId: import("mongoose").Types.ObjectId;
                goalType: string;
                targetValue: number;
                actualValue: number;
                progress: string;
                status: string;
                appInfo: string | null;
            }[];
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
}
