import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from '../schemas/device.schema';
import {
  DeviceNotFoundException,
  InvalidInputException,
} from '../exceptions/custom.exceptions';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  /**
   * Create device
   */
  async createDevice(userId: string, deviceData: any) {
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

  /**
   * Get all devices of user
   */
  async getDevicesByUserId(userId: string) {
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

  /**
   * Get device by ID
   */
  async getDeviceById(deviceId: string) {
    if (!deviceId) {
      throw new InvalidInputException('deviceId', 'Device ID is required');
    }

    const device = await this.deviceModel.findById(deviceId).exec();
    if (!device) {
      throw new DeviceNotFoundException(deviceId);
    }
    return device;
  }

  /**
   * Update device
   */
  async updateDevice(deviceId: string, updateData: any) {
    const device = await this.deviceModel.findByIdAndUpdate(
      deviceId,
      updateData,
      { new: true },
    );

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

  /**
   * Delete device
   */
  async deleteDevice(deviceId: string) {
    const device = await this.deviceModel.findByIdAndDelete(deviceId).exec();
    if (!device) {
      throw new DeviceNotFoundException(deviceId);
    }
    return device;
  }
}
