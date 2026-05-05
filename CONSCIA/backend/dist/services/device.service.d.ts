import { Model } from 'mongoose';
import { Device } from '../schemas/device.schema';
export declare class DeviceService {
    private deviceModel;
    constructor(deviceModel: Model<Device>);
    createDevice(userId: string, deviceData: any): Promise<{
        deviceId: import("mongoose").Types.ObjectId;
        userId: string;
        deviceName: string;
        deviceType: string;
        osVersion: string;
        deviceModel: string;
        createdAt: Date;
    }>;
    getDevicesByUserId(userId: string): Promise<{
        deviceId: import("mongoose").Types.ObjectId;
        userId: string;
        deviceName: string;
        deviceType: string;
        osVersion: string;
        deviceModel: string;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    getDeviceById(deviceId: string): Promise<import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateDevice(deviceId: string, updateData: any): Promise<{
        deviceId: import("mongoose").Types.ObjectId;
        deviceName: string;
        deviceType: string;
        updatedAt: Date;
    }>;
    deleteDevice(deviceId: string): Promise<import("mongoose").Document<unknown, {}, Device, {}, import("mongoose").DefaultSchemaOptions> & Device & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
