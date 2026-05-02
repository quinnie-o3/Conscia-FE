import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export enum PeriodEnum {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

export class ScreenTimeQueryDto {
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @IsString()
    @IsOptional()
    date: string;
}

export class TopAppsQueryDto {
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @IsString()
    @IsOptional()
    date: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    limit: number = 5;
}

export class UsageByPurposeQueryDto {
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @IsString()
    @IsOptional()
    date: string;
}

export class TrendQueryDto {
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;
}

export class InsightsQueryDto {
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @IsString()
    @IsOptional()
    date: string;
}