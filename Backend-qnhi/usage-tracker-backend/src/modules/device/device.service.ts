import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Device } from './device.schema';
import { RegisterDeviceDto } from './dto/register-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<Device>,
  ) {}

  async register(dto: RegisterDeviceDto) {
    const device = await this.deviceModel.findOneAndUpdate(
      {
        anonymousUserId: dto.anonymousUserId,
        deviceId: dto.deviceId,
      },
      {
        $set: {
          ...dto,
          platform: 'android',
          isActive: true,
          lastSyncAt: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return device;
  }
}