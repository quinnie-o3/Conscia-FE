import { AppInfoService } from '../services/app-info.service';
import { CreateAppDto, UpdateAppDto } from '../dtos/app.dto';
export declare class AppInfoController {
    private appInfoService;
    constructor(appInfoService: AppInfoService);
    getAllApps(category?: string): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
    getAppById(appId: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
    createApp(createAppDto: CreateAppDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
    updateApp(appId: string, updateAppDto: UpdateAppDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
    deleteApp(appId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
    getAppByPackageName(packageName: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/app-info.schema").AppInfo, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/app-info.schema").AppInfo & Required<{
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
}
