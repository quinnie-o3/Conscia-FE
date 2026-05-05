import { SessionService } from '../services/session.service';
import { CreateSessionDto, CreateSessionsBatchDto, ClassifySessionDto, GetSessionsQueryDto, SyncSessionsBatchDto } from '../dtos/session.dto';
import { InsightsQueryDto } from '../dtos/stats.dto';
import { Model } from 'mongoose';
export declare class SessionController {
    private sessionService;
    private tagModel;
    constructor(sessionService: SessionService, tagModel: Model<any>);
    createSession(createSessionDto: CreateSessionDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    createSessionsBatch(createSessionsBatchDto: CreateSessionsBatchDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        }, Omit<{
            userId: string;
            deviceId: any;
            appId: any;
            startedAt: Date;
            endedAt: Date;
            durationSeconds: number;
            sessionDate: Date;
            createdAt: Date;
        }, "_id">>[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getSessions(query: GetSessionsQueryDto, user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
        pagination?: undefined;
    }>;
    getSessionsByDate(date: string, user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getUnclassifiedSessions(user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getSessionById(sessionId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    classifySession(sessionId: string, classifySessionDto: ClassifySessionDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    updateSession(sessionId: string, body: any, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    deleteSession(sessionId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/usage-session.schema").UsageSession, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/usage-session.schema").UsageSession & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    syncSessions(dto: SyncSessionsBatchDto, user: any): Promise<{
        success: boolean;
        data: {
            count: any;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getPurposeInsights(query: InsightsQueryDto, user: any): Promise<{
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
    seedPurposeTags(): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
    }>;
}
