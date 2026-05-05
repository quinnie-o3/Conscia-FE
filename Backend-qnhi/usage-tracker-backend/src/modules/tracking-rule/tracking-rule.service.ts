import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TrackingRule } from './tracking-rule.schema';
import { UpsertTrackingRuleDto } from './dto/upsert-tracking-rule.dto';

@Injectable()
export class TrackingRuleService {
  constructor(
    @InjectModel(TrackingRule.name)
    private readonly trackingRuleModel: Model<TrackingRule>,
  ) {}

  async upsert(dto: UpsertTrackingRuleDto) {
    return this.trackingRuleModel.findOneAndUpdate(
      {
        anonymousUserId: dto.anonymousUserId,
        deviceId: dto.deviceId,
        packageName: dto.packageName,
      },
      {
        $set: {
          appName: dto.appName,
          purposeTag: dto.purposeTag,
          dailyLimitMinutes: dto.dailyLimitMinutes,
          trackingEnabled: dto.trackingEnabled ?? true,
          warningEnabled: dto.warningEnabled ?? true,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

  async findAll(anonymousUserId: string, deviceId: string) {
    return this.trackingRuleModel
      .find({
        anonymousUserId,
        deviceId,
      })
      .sort({ createdAt: -1 });
  }

  async deleteOne(
    anonymousUserId: string,
    deviceId: string,
    packageName: string,
  ) {
    return this.trackingRuleModel.deleteOne({
      anonymousUserId,
      deviceId,
      packageName,
    });
  }

  async findActiveRules(anonymousUserId: string, deviceId: string) {
    return this.trackingRuleModel.find({
      anonymousUserId,
      deviceId,
      trackingEnabled: true,
    });
  }
}