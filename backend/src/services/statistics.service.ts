import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';
import { Goal } from '../schemas/goal.schema';

export type Period = 'daily' | 'weekly' | 'monthly';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(UsageSession.name)
    private sessionModel: Model<UsageSession>,
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
  ) {}

  /**
   * Build date range from a period and anchor date
   */
  private getDateRange(
    period: Period,
    date: string,
  ): { start: Date; end: Date } {
    const anchor = new Date(date);

    if (period === 'daily') {
      const start = new Date(anchor);
      start.setHours(0, 0, 0, 0);
      const end = new Date(anchor);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }

    if (period === 'weekly') {
      const start = new Date(anchor);
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }

    // monthly
    const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  /**
   * Get total screen time for a period
   * Returns total seconds and a human-readable breakdown
   */
  async getTotalScreenTime(userId: string, period: Period, date: string) {
    const { start, end } = this.getDateRange(period, date);

    const result = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
    ]);

    const totalSeconds = result[0]?.totalSeconds ?? 0;
    const sessionCount = result[0]?.sessionCount ?? 0;

    return {
      period,
      date,
      dateRange: { start, end },
      totalSeconds,
      totalMinutes: Math.floor(totalSeconds / 60),
      totalHours: parseFloat((totalSeconds / 3600).toFixed(2)),
      sessionCount,
      formatted: this.formatDuration(totalSeconds),
    };
  }

  /**
   * Get top used apps for a period
   */
  async getTopApps(userId: string, period: Period, date: string, limit = 10) {
    const { start, end } = this.getDateRange(period, date);

    const result = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
        },
      },
      {
        $group: {
          _id: '$appId',
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSeconds: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'appinfos',
          localField: '_id',
          foreignField: '_id',
          as: 'appInfo',
        },
      },
      {
        $unwind: {
          path: '$appInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          appId: '$_id',
          appName: { $ifNull: ['$appInfo.appName', 'Unknown App'] },
          packageName: { $ifNull: ['$appInfo.packageName', ''] },
          appCategory: { $ifNull: ['$appInfo.appCategory', ''] },
          iconUrl: { $ifNull: ['$appInfo.iconUrl', ''] },
          totalSeconds: 1,
          totalMinutes: {
            $floor: { $divide: ['$totalSeconds', 60] },
          },
          sessionCount: 1,
        },
      },
    ]);

    // Calculate percentage of total
    const totalSeconds = result.reduce((sum, app) => sum + app.totalSeconds, 0);

    return {
      period,
      date,
      dateRange: { start, end },
      topApps: result.map((app) => ({
        ...app,
        percentage:
          totalSeconds > 0
            ? parseFloat(((app.totalSeconds / totalSeconds) * 100).toFixed(1))
            : 0,
        formatted: this.formatDuration(app.totalSeconds),
      })),
      totalSeconds,
    };
  }

  /**
   * Get usage distribution by purpose/tag
   */
  async getUsageByPurpose(userId: string, period: Period, date: string) {
    const { start, end } = this.getDateRange(period, date);

    const classified = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
          isClassified: true,
        },
      },
      { $unwind: '$tags' },
      {
        $group: {
          _id: {
            tagId: '$tags.tagId',
            tagName: '$tags.tagName',
          },
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSeconds: -1 } },
      {
        $project: {
          tagId: '$_id.tagId',
          tagName: '$_id.tagName',
          totalSeconds: 1,
          totalMinutes: {
            $floor: { $divide: ['$totalSeconds', 60] },
          },
          sessionCount: 1,
          _id: 0,
        },
      },
    ]);

    // Unclassified time
    const unclassifiedResult = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
          isClassified: false,
        },
      },
      {
        $group: {
          _id: null,
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
    ]);

    const unclassifiedSeconds = unclassifiedResult[0]?.totalSeconds ?? 0;
    const unclassifiedCount = unclassifiedResult[0]?.sessionCount ?? 0;

    const totalSeconds =
      classified.reduce((sum, tag) => sum + tag.totalSeconds, 0) +
      unclassifiedSeconds;

    const distribution = classified.map((tag) => ({
      ...tag,
      percentage:
        totalSeconds > 0
          ? parseFloat(((tag.totalSeconds / totalSeconds) * 100).toFixed(1))
          : 0,
      formatted: this.formatDuration(tag.totalSeconds),
    }));

    if (unclassifiedSeconds > 0) {
      distribution.push({
        tagId: null,
        tagName: 'Unclassified',
        totalSeconds: unclassifiedSeconds,
        totalMinutes: Math.floor(unclassifiedSeconds / 60),
        sessionCount: unclassifiedCount,
        percentage:
          totalSeconds > 0
            ? parseFloat(
                ((unclassifiedSeconds / totalSeconds) * 100).toFixed(1),
              )
            : 0,
        formatted: this.formatDuration(unclassifiedSeconds),
      });
    }

    return {
      period,
      date,
      dateRange: { start, end },
      totalSeconds,
      distribution,
    };
  }

  /**
   * Get daily screen time trend for a date range
   */
  async getDailyTrend(userId: string, startDate: string, endDate: string) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const result = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$sessionDate',
            },
          },
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          totalSeconds: 1,
          totalMinutes: {
            $floor: { $divide: ['$totalSeconds', 60] },
          },
          sessionCount: 1,
          formatted: '$totalSeconds',
          _id: 0,
        },
      },
    ]);

    // Fill missing dates with 0
    const filledData = this.fillMissingDates(result, startDate, endDate);

    return {
      startDate,
      endDate,
      trend: filledData.map((d) => ({
        ...d,
        formatted: this.formatDuration(d.totalSeconds),
      })),
    };
  }

  /**
   * Get insight summary: most distracting apps, peak usage time, common purposes
   */
  async getInsights(userId: string, period: Period, date: string) {
    const { start, end } = this.getDateRange(period, date);

    // Most distracting apps (highest usage in "Mindless Scrolling" or "Social" category)
    const distractingApps = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
          isClassified: true,
          'tags.tagName': {
            $in: ['Mindless Scrolling', 'Social', 'Entertainment'],
          },
        },
      },
      {
        $group: {
          _id: '$appId',
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSeconds: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'appinfos',
          localField: '_id',
          foreignField: '_id',
          as: 'appInfo',
        },
      },
      {
        $unwind: {
          path: '$appInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          appId: '$_id',
          appName: { $ifNull: ['$appInfo.appName', 'Unknown App'] },
          packageName: { $ifNull: ['$appInfo.packageName', ''] },
          totalSeconds: 1,
          totalMinutes: {
            $floor: { $divide: ['$totalSeconds', 60] },
          },
          sessionCount: 1,
        },
      },
    ]);

    // Peak usage hour
    const peakHours = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
        },
      },
      {
        $group: {
          _id: { $hour: '$startTime' },
          totalSeconds: { $sum: '$durationSeconds' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { totalSeconds: -1 } },
      { $limit: 3 },
      {
        $project: {
          hour: '$_id',
          totalSeconds: 1,
          totalMinutes: {
            $floor: { $divide: ['$totalSeconds', 60] },
          },
          sessionCount: 1,
          _id: 0,
        },
      },
    ]);

    // Most common purpose
    const commonPurposes = await this.sessionModel.aggregate([
      {
        $match: {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
          isClassified: true,
        },
      },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags.tagName',
          count: { $sum: 1 },
          totalSeconds: { $sum: '$durationSeconds' },
        },
      },
      { $sort: { totalSeconds: -1 } },
      { $limit: 3 },
      {
        $project: {
          purpose: '$_id',
          count: 1,
          totalSeconds: 1,
          _id: 0,
        },
      },
    ]);

    return {
      period,
      date,
      dateRange: { start, end },
      insights: {
        mostDistractingApps: distractingApps,
        peakUsageHours: peakHours.map((h) => ({
          ...h,
          label: this.formatHour(h.hour),
        })),
        commonPurposes,
      },
    };
  }

  /**
   * Get goal progress for a user
   */
  async getGoalProgress(userId: string) {
    const goals = await this.goalModel.find({
      userId,
      status: 'ACTIVE',
    });

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];

    const progressList = await Promise.all(
      goals.map(async (goal) => {
        const period: Period =
          goal.periodType === 'WEEKLY'
            ? 'weekly'
            : goal.periodType === 'MONTHLY'
              ? 'monthly'
              : 'daily';
        const anchorDate = period === 'weekly' ? weekStartStr : todayStr;
        const { start, end } = this.getDateRange(period, anchorDate);

        const matchQuery: any = {
          userId: userId,
          sessionDate: { $gte: start, $lte: end },
          isCompleted: true,
        };

        if (goal.appId) {
          matchQuery.appId = goal.appId;
        }

        const result = await this.sessionModel.aggregate([
          { $match: matchQuery },
          {
            $group: {
              _id: null,
              totalSeconds: { $sum: '$durationSeconds' },
            },
          },
        ]);

        const actualSeconds = result[0]?.totalSeconds ?? 0;
        const actualMinutes = Math.floor(actualSeconds / 60);
        const targetValue = goal.targetValue;
        const progressPercent = Math.min(
          parseFloat(((actualMinutes / targetValue) * 100).toFixed(1)),
          100,
        );
        const isExceeded = actualMinutes > targetValue;

        return {
          goalId: goal._id,
          goalName: goal.goalName,
          goalType: goal.goalType,
          periodType: goal.periodType,
          targetValue,
          targetUnit: goal.targetUnit,
          currentValue: actualMinutes,
          progressPercent,
          isExceeded,
          status: goal.status,
          startDate: goal.startDate,
          endDate: goal.endDate,
        };
      }),
    );

    return {
      goals: progressList,
      total: progressList.length,
      exceeded: progressList.filter((g) => g.isExceeded).length,
    };
  }

  // ----------------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------------

  private formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  private formatHour(hour: number): string {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  }

  private fillMissingDates(
    data: Array<{
      date: string;
      totalSeconds: number;
      totalMinutes: number;
      sessionCount: number;
      formatted: number;
    }>,
    startDate: string,
    endDate: string,
  ) {
    const map = new Map(data.map((d) => [d.date, d]));
    const result: Array<{
      date: string;
      totalSeconds: number;
      totalMinutes: number;
      sessionCount: number;
      formatted: number;
    }> = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      result.push(
        map.get(dateStr) ?? {
          date: dateStr,
          totalSeconds: 0,
          totalMinutes: 0,
          sessionCount: 0,
          formatted: 0,
        },
      );
      current.setDate(current.getDate() + 1);
    }

    return result;
  }
}
