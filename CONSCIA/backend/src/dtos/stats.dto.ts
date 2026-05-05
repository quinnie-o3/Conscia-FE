import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PeriodEnum {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

export class ScreenTimeQueryDto {
    @ApiPropertyOptional({ enum: PeriodEnum, default: PeriodEnum.DAILY })
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @ApiPropertyOptional({ example: '2026-05-04' })
    @IsString()
    @IsOptional()
    date: string;
}

export class TopAppsQueryDto {
    @ApiPropertyOptional({ enum: PeriodEnum, default: PeriodEnum.DAILY })
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @ApiPropertyOptional({ example: '2026-05-04' })
    @IsString()
    @IsOptional()
    date: string;

    @ApiPropertyOptional({ minimum: 1, default: 5 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    limit: number = 5;
}

export class UsageByPurposeQueryDto {
    @ApiPropertyOptional({ enum: PeriodEnum, default: PeriodEnum.DAILY })
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @ApiPropertyOptional({ example: '2026-05-04' })
    @IsString()
    @IsOptional()
    date: string;
}

export class TrendQueryDto {
    @ApiProperty({ example: '2026-05-01' })
    @IsString()
    startDate: string;

    @ApiProperty({ example: '2026-05-07' })
    @IsString()
    endDate: string;
}

export class InsightsQueryDto {
    @ApiPropertyOptional({ enum: PeriodEnum, default: PeriodEnum.DAILY })
    @IsEnum(PeriodEnum)
    @IsOptional()
    period: PeriodEnum = PeriodEnum.DAILY;

    @ApiPropertyOptional({ example: '2026-05-04' })
    @IsString()
    @IsOptional()
    date: string;
}