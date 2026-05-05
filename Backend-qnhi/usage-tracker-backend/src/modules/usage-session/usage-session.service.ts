import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsageSession } from './usage-session.schema';
import { SyncUsageSessionsDto } from './dto/sync-usage-sessions.dto';

@Injectable()
export class UsageSessionService {
  constructor(
    @InjectModel(UsageSession.name)
    private readonly usageSessionModel: Model<UsageSession>,
  ) {}

  async sync(dto: SyncUsageSessionsDto) {
    let inserted = 0;
    let skipped = 0;

    for (const session of dto.sessions) {
      const startTime = new Date(session.startTime);
      const endTime = new Date(session.endTime);

      const sessionDate = new Date(startTime);
      sessionDate.setHours(0, 0, 0, 0);

      const externalId =
        session.externalId ||
        `${dto.deviceId}_${session.packageName}_${session.startTime}_${session.endTime}`;

      const result = await this.usageSessionModel.updateOne(
        { externalId },
        {
          $setOnInsert: {
            anonymousUserId: dto.anonymousUserId,
            deviceId: dto.deviceId,
            packageName: session.packageName,
            appName: session.appName,
            purposeTag: session.purposeTag,
            startTime,
            endTime,
            durationSeconds: session.durationSeconds,
            sessionDate,
            externalId,
          },
        },
        { upsert: true },
      );

      if (result.upsertedCount > 0) {
        inserted++;
      } else {
        skipped++;
      }
    }

    return {
      inserted,
      skipped,
    };
  }

  async findByDate(
    anonymousUserId: string,
    deviceId: string,
    date: string,
  ) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.usageSessionModel.find({
      anonymousUserId,
      deviceId,
      sessionDate: {
        $gte: start,
        $lte: end,
      },
    });
  }
}