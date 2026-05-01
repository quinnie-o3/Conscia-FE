import { IsString, IsArray, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateSessionDto {
    @IsString()
    deviceId: string;

    @IsString()
    appId: string;

    @IsString()
    startedAt: string;

    @IsString()
    endedAt: string;

    @IsString()
    date: string;
}

export class CreateSessionsBatchDto {
    @IsArray()
    sessions: CreateSessionDto[];
}

export class SyncSessionDto {
    @IsString()
    @IsOptional()
    externalId?: string;

    @IsString()
    deviceId: string;

    @IsString()
    @IsOptional()
    packageName?: string;

    @IsString()
    @IsOptional()
    appName?: string;

    @IsString()
    startedAt: string;

    @IsString()
    endedAt: string;

    @IsNumber()
    durationSeconds: number;

    @IsOptional()
    isClassified?: boolean;

    @IsArray()
    @IsOptional()
    tags?: string[];
}

export class SyncSessionsBatchDto {
    @IsArray()
    sessions: SyncSessionDto[];
}

export class ClassifySessionDto {
    @IsArray()
    @IsOptional()
    tags: string[];

    @IsString()
    @IsOptional()
    note: string;
}

export class GetSessionsQueryDto {
    @IsString()
    @IsOptional()
    dateFrom: string;

    @IsString()
    @IsOptional()
    dateTo: string;

    @IsString()
    @IsOptional()
    appId: string;

    @IsString()
    @IsOptional()
    status: 'classified' | 'unclassified';

    @IsNumber()
    @Min(1)
    @IsOptional()
    page: number = 1;

    @IsNumber()
    @Min(1)
    @IsOptional()
    limit: number = 20;
}