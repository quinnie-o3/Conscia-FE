import mongoose, { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';
import { PurposeTag } from '../schemas/purpose-tag.schema';
import { SyncSessionsBatchDto } from '../dtos/session.dto';
export declare class SessionService {
    private sessionModel;
    private tagModel;
    constructor(sessionModel: Model<UsageSession>, tagModel: Model<PurposeTag>);
    createSession(userId: string, sessionData: any): Promise<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createSessionsBatch(userId: string, sessionsList: any[]): Promise<mongoose.MergeType<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
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
    }, "_id">>[]>;
    syncSessions(userId: string, dto: SyncSessionsBatchDto): Promise<{
        count: any;
    }>;
    getUsageByPurpose(userId: string, query: {
        period?: 'daily' | 'weekly' | 'monthly';
        date?: string;
    }): Promise<{
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
    private getStartDate;
    getPurposeInsights(userId: string, fromStr: string, toStr: string): Promise<{
        totalDurationSeconds: number;
        purposefulPercentage: number;
        distractingPercentage: number;
        categories: any[];
        tags: any[];
    }>;
    getSessionsByUserId(userId: string, filters?: {
        dateFrom?: string;
        dateTo?: string;
        appId?: string;
        status?: 'classified' | 'unclassified';
        page?: number;
        limit?: number;
    }): Promise<{
        data: (mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
            _id: mongoose.Types.ObjectId;
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
    }>;
    getSessionsByDate(userId: string, date: string): Promise<(mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUnclassifiedSessions(userId: string): Promise<(mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSessionById(sessionId: string): Promise<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateSession(sessionId: string, updateData: any): Promise<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    classifySession(sessionId: string, classifyData: any): Promise<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteSession(sessionId: string): Promise<mongoose.Document<unknown, {}, UsageSession, {}, mongoose.DefaultSchemaOptions> & UsageSession & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
