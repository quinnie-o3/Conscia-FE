export declare class CreateSessionDto {
    deviceId: string;
    appId: string;
    startedAt: string;
    endedAt: string;
    date: string;
}
export declare class CreateSessionsBatchDto {
    sessions: CreateSessionDto[];
}
export declare class SyncSessionDto {
    externalId?: string;
    deviceId: string;
    packageName?: string;
    appName?: string;
    startedAt: string;
    endedAt: string;
    durationSeconds: number;
    isClassified?: boolean;
    tags?: string[];
}
export declare class SyncSessionsBatchDto {
    sessions: SyncSessionDto[];
}
export declare class ClassifySessionDto {
    tags: string[];
    note: string;
}
export declare class GetSessionsQueryDto {
    dateFrom: string;
    dateTo: string;
    appId: string;
    status: 'classified' | 'unclassified';
    page: number;
    limit: number;
}
