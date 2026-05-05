import { Model } from 'mongoose';
import { AppInfo } from '../schemas/app-info.schema';
export declare class AppInfoService {
    private appInfoModel;
    constructor(appInfoModel: Model<AppInfo>);
    getAllApps(category?: string): Promise<(import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAppById(appId: string): Promise<import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAppByPackageName(packageName: string): Promise<import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createApp(packageName: string, appName: string, category: string, iconReference?: string): Promise<import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateApp(appId: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteApp(appId: string): Promise<import("mongoose").Document<unknown, {}, AppInfo, {}, import("mongoose").DefaultSchemaOptions> & AppInfo & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
