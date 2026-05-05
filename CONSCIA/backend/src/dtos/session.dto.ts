import { IsString, IsArray, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
    @ApiProperty({ example: 'device-12345' })
    @IsString()
    deviceId: string;

    @ApiProperty({ example: 'com.example.app' })
    @IsString()
    appId: string;

    @ApiProperty({ example: '2026-05-04T08:30:00.000Z' })
    @IsString()
    startedAt: string;

    @ApiProperty({ example: '2026-05-04T09:00:00.000Z' })
    @IsString()
    endedAt: string;

    @ApiProperty({ example: '2026-05-04' })
    @IsString()
    date: string;
}

export class CreateSessionsBatchDto {
    @ApiProperty({ type: [CreateSessionDto] })
    @IsArray()
    sessions: CreateSessionDto[];
}

export class SyncSessionDto {
    @ApiPropertyOptional({ example: 'external-12345' })
    @IsString()
    @IsOptional()
    externalId?: string;

    @ApiProperty({ example: 'device-12345' })
    @IsString()
    deviceId: string;

    @ApiPropertyOptional({ example: 'com.example.android' })
    @IsString()
    @IsOptional()
    packageName?: string;

    @ApiPropertyOptional({ example: 'Example App' })
    @IsString()
    @IsOptional()
    appName?: string;

    @ApiProperty({ example: '2026-05-04T08:30:00.000Z' })
    @IsString()
    startedAt: string;

    @ApiProperty({ example: '2026-05-04T09:00:00.000Z' })
    @IsString()
    endedAt: string;

    @ApiProperty({ example: 1800 })
    @IsNumber()
    durationSeconds: number;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    isClassified?: boolean;

    @ApiPropertyOptional({ type: [String], example: ['Learning', 'Productivity'] })
    @IsArray()
    @IsOptional()
    tags?: string[];
}

export class SyncSessionsBatchDto {
    @ApiProperty({ type: [SyncSessionDto] })
    @IsArray()
    sessions: SyncSessionDto[];
}

export class ClassifySessionDto {
    @ApiPropertyOptional({ type: [String], example: ['Learning', 'Work'] })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiPropertyOptional({ example: 'Focus session for study' })
    @IsString()
    @IsOptional()
    note: string;
}

export class GetSessionsQueryDto {
    @ApiPropertyOptional({ example: '2026-05-01' })
    @IsString()
    @IsOptional()
    dateFrom: string;

    @ApiPropertyOptional({ example: '2026-05-04' })
    @IsString()
    @IsOptional()
    dateTo: string;

    @ApiPropertyOptional({ example: 'com.example.app' })
    @IsString()
    @IsOptional()
    appId: string;

    @ApiPropertyOptional({ example: 'classified', enum: ['classified', 'unclassified'] })
    @IsString()
    @IsOptional()
    status: 'classified' | 'unclassified';

    @ApiPropertyOptional({ example: 1, minimum: 1, default: 1 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @ApiPropertyOptional({ example: 20, minimum: 1, default: 20 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    limit: number = 20;
}