import { Injectable } from '@nestjs/common';
import { UsageSessionService } from '../usage-session/usage-session.service';
import { TrackingRuleService } from '../tracking-rule/tracking-rule.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly usageSessionService: UsageSessionService,
    private readonly trackingRuleService: TrackingRuleService,
  ) {}

  async getDailySummary(
    anonymousUserId: string,
    deviceId: string,
    date: string,
  ) {
    const sessions = await this.usageSessionService.findByDate(
      anonymousUserId,
      deviceId,
      date,
    );

    const rules = await this.trackingRuleService.findActiveRules(
      anonymousUserId,
      deviceId,
    );

    const totalDurationSeconds = sessions.reduce(
      (sum, session) => sum + (session.durationSeconds || 0),
      0,
    );

    const byPurposeMap = new Map<string, number>();
    const byAppMap = new Map<
      string,
      {
        packageName: string;
        appName?: string;
        purposeTag?: string;
        durationSeconds: number;
      }
    >();

    for (const session of sessions) {
      const purposeTag = session.purposeTag || 'Unclassified';

      byPurposeMap.set(
        purposeTag,
        (byPurposeMap.get(purposeTag) || 0) + session.durationSeconds,
      );

      if (!byAppMap.has(session.packageName)) {
        byAppMap.set(session.packageName, {
          packageName: session.packageName,
          appName: session.appName,
          purposeTag: session.purposeTag,
          durationSeconds: 0,
        });
      }

      byAppMap.get(session.packageName)!.durationSeconds +=
        session.durationSeconds;
    }

    const byPurpose = Array.from(byPurposeMap.entries()).map(
      ([purposeTag, durationSeconds]) => ({
        purposeTag,
        durationSeconds,
        usedMinutes: Math.round(durationSeconds / 60),
        percentage:
          totalDurationSeconds > 0
            ? Number(
                ((durationSeconds / totalDurationSeconds) * 100).toFixed(1),
              )
            : 0,
      }),
    );

    const byApp = Array.from(byAppMap.values()).map((app) => {
      const rule = rules.find(
        (item) => item.packageName === app.packageName,
      );

      const usedMinutes = Math.round(app.durationSeconds / 60);
      const limitMinutes = rule?.dailyLimitMinutes ?? null;

      return {
        packageName: app.packageName,
        appName: app.appName,
        purposeTag: app.purposeTag || rule?.purposeTag || 'Unclassified',
        durationSeconds: app.durationSeconds,
        usedMinutes,
        limitMinutes,
        isExceeded:
          limitMinutes !== null ? usedMinutes > limitMinutes : false,
      };
    });

    const limitWarnings = byApp
      .filter((app) => app.isExceeded)
      .map((app) => ({
        packageName: app.packageName,
        appName: app.appName,
        usedMinutes: app.usedMinutes,
        limitMinutes: app.limitMinutes,
        exceededByMinutes:
          app.limitMinutes !== null
            ? app.usedMinutes - app.limitMinutes
            : 0,
      }));

    return {
      date,
      totalDurationSeconds,
      totalUsedMinutes: Math.round(totalDurationSeconds / 60),
      byPurpose,
      byApp,
      limitWarnings,
    };
  }
}