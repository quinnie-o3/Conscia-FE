export declare enum PeriodEnum {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}
export declare class ScreenTimeQueryDto {
    period: PeriodEnum;
    date: string;
}
export declare class TopAppsQueryDto {
    period: PeriodEnum;
    date: string;
    limit: number;
}
export declare class UsageByPurposeQueryDto {
    period: PeriodEnum;
    date: string;
}
export declare class TrendQueryDto {
    startDate: string;
    endDate: string;
}
export declare class InsightsQueryDto {
    period: PeriodEnum;
    date: string;
}
