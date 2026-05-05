"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const device_schema_1 = require("../schemas/device.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let DeviceService = class DeviceService {
    deviceModel;
    constructor(deviceModel) {
        this.deviceModel = deviceModel;
    }
    async createDevice(userId, deviceData) {
        const device = await this.deviceModel.create({
            userId,
            ...deviceData,
            isActive: true,
        });
        return {
            deviceId: device._id,
            userId: device.userId,
            deviceName: device.deviceName,
            deviceType: device.deviceType,
            osVersion: device.osVersion,
            deviceModel: device.deviceModel,
            createdAt: device.createdAt,
        };
    }
    async getDevicesByUserId(userId) {
        const devices = await this.deviceModel.find({ userId });
        return devices.map((d) => ({
            deviceId: d._id,
            userId: d.userId,
            deviceName: d.deviceName,
            deviceType: d.deviceType,
            osVersion: d.osVersion,
            deviceModel: d.deviceModel,
            isActive: d.isActive,
            createdAt: d.createdAt,
        }));
    }
    async getDeviceById(deviceId) {
        if (!deviceId) {
            throw new custom_exceptions_1.InvalidInputException('deviceId', 'Device ID is required');
        }
        const device = await this.deviceModel.findById(deviceId).exec();
        if (!device) {
            throw new custom_exceptions_1.DeviceNotFoundException(deviceId);
        }
        return device;
    }
    async updateDevice(deviceId, updateData) {
        const device = await this.deviceModel.findByIdAndUpdate(deviceId, updateData, { new: true });
        if (!device) {
            throw new Error('Device not found');
        }
        return {
            deviceId: device._id,
            deviceName: device.deviceName,
            deviceType: device.deviceType,
            updatedAt: device.updatedAt,
        };
    }
    async deleteDevice(deviceId) {
        const device = await this.deviceModel.findByIdAndDelete(deviceId).exec();
        if (!device) {
            throw new custom_exceptions_1.DeviceNotFoundException(deviceId);
        }
        return device;
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(device_schema_1.Device.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeviceService);
//# sourceMappingURL=device.service.js.map