import { DeviceService } from '../services/device.service';
export declare class DeviceController {
    private deviceService;
    constructor(deviceService: DeviceService);
    createDevice(body: {
        userId: string;
        deviceName: string;
        deviceType: string;
    }): Promise<{
        success: boolean;
        data: {
            deviceId: import("mongoose").Types.ObjectId;
            userId: string;
            deviceName: string;
            deviceType: string;
            osVersion: string;
            deviceModel: string;
            createdAt: Date;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getDevicesByUser(userId: string): Promise<{
        success: boolean;
        data: {
            deviceId: import("mongoose").Types.ObjectId;
            userId: string;
            deviceName: string;
            deviceType: string;
            osVersion: string;
            deviceModel: string;
            isActive: boolean;
            createdAt: Date;
        }[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getDeviceById(deviceId: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & Required<{
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
    updateDevice(deviceId: string, body: any): Promise<{
        success: boolean;
        data: {
            deviceId: import("mongoose").Types.ObjectId;
            deviceName: string;
            deviceType: string;
            updatedAt: Date;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    deleteDevice(deviceId: string): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/device.schema").Device, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/device.schema").Device & Required<{
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
