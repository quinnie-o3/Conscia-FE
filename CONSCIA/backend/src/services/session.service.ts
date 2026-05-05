import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';
import { PurposeTag } from '../schemas/purpose-tag.schema';
import { SyncSessionDto, SyncSessionsBatchDto } from '../dtos/session.dto';
import {
  SessionNotFoundException,
  InvalidInputException,
} from '../exceptions/custom.exceptions';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(UsageSession.name) private sessionModel: Model<UsageSession>,
    @InjectModel(PurposeTag.name) private tagModel: Model<PurposeTag>,
  ) { }

  async createSession(userId: string, sessionData: any) {
    const { deviceId, appId, startedAt, endedAt, date } = sessionData;

    const duration = new Date(endedAt).getTime() - new Date(startedAt).getTime();

    const newSession = await this.sessionModel.create({
      userId,
      deviceId,
      appId,
      startedAt: new Date(startedAt),
      endedAt: new Date(endedAt),
      durationSeconds: Math.floor(duration / 1000),
      sessionDate: new Date(date),
      createdAt: new Date(),
    });

    return newSession;
  }

  async createSessionsBatch(userId: string, sessionsList: any[]) {
    try {
      const sessionsToCreate = sessionsList.map((session) => {
        const duration =
          new Date(session.endedAt).getTime() -
          new Date(session.startedAt).getTime();

        return {
          userId,
          deviceId: session.deviceId,
          appId: session.appId,
          startedAt: new Date(session.startedAt),
          endedAt: new Date(session.endedAt),
          durationSeconds: Math.floor(duration / 1000),
          sessionDate: new Date(session.date),
          createdAt: new Date(),
        };
      });

      const createdSessions = await this.sessionModel.insertMany(
        sessionsToCreate,
      );
      return createdSessions;
    } catch (error) {
      throw new Error(`Failed to create batch sessions: ${error.message}`);
    }
  }

  async syncSessions(userId: string, dto: SyncSessionsBatchDto) {
    try {
      const sessionsToCreate = dto.sessions.map((session) => {
        const startedAt = new Date(session.startedAt);
        const endedAt = new Date(session.endedAt);
        const sessionDate = new Date(startedAt);
        sessionDate.setHours(0, 0, 0, 0);

        const tagsObj = Array.isArray(session.tags)
          ? session.tags.map((t) => (typeof t === 'string' ? { tagName: t } : t))
          : [];

        return {
          userId,
          externalId:
            session.externalId || `${userId}_${session.packageName || 'unknown'}_${session.startedAt}`,
          deviceId: session.deviceId,
          packageName: session.packageName,
          appName: session.appName,
          startedAt,
          endedAt,
          sessionDate,
          durationSeconds: session.durationSeconds,
          isClassified: session.isClassified || false,
          tags: tagsObj,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      const createdSessions = await this.sessionModel.insertMany(sessionsToCreate, {
        ordered: false,
      });

      return { count: createdSessions.length };
    } catch (error) {
      if (error?.code === 11000 && error?.result?.nInserted != null) {
        return { count: error.result.nInserted };
      }
      throw new Error(`Failed to sync sessions: ${error.message}`);
    }
  }

  async getUsageByPurpose(
    userId: string,
    query: { period?: 'daily' | 'weekly' | 'monthly'; date?: string },
  ) {
    const period = query.period || 'daily';
    const date = query.date ? new Date(query.date) : new Date();
    const startDate = this.getStartDate(period, new Date(date));
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const pipeline: any[] = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          sessionDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $unwind: {
          path: '$tags',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          tagName: {
            $cond: {
              if: { $gt: [{ $size: { $ifNull: ['$tags', []] } }, 0] },
              then: '$tags.tagName',
              else: 'Unclassified',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'purposetags',
          localField: 'tagName',
          foreignField: 'tagName',
          as: 'tagInfo',
        },
      },
      {
        $addFields: {
          category: {
            $cond: {
              if: { $gt: [{ $size: '$tagInfo' }, 0] },
              then: { $arrayElemAt: ['$tagInfo.category', 0] },
              else: 'NEUTRAL',
            },
          },
          colorCode: {
            $cond: {
              if: { $gt: [{ $size: '$tagInfo' }, 0] },
              then: { $arrayElemAt: ['$tagInfo.colorCode', 0] },
              else: '#999999',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            tagName: '$tagName',
            category: '$category',
            colorCode: '$colorCode',
          },
          totalDurationSeconds: { $sum: '$durationSeconds' },
        },
      },
      {
        $project: {
          _id: 0,
          tagName: '$_id.tagName',
          category: '$_id.category',
          colorCode: '$_id.colorCode',
          totalDurationSeconds: 1,
        },
      },
      { $sort: { totalDurationSeconds: -1 } },
    ];

    const results = await this.sessionModel.aggregate(pipeline).exec();
    const totalSeconds = results.reduce(
      (sum, item) => sum + (item.totalDurationSeconds || 0),
      0,
    );
    const purposefulSeconds = results
      .filter((item: any) => item.category === 'PURPOSEFUL')
      .reduce((sum: number, item: any) => sum + (item.totalDurationSeconds || 0), 0);
    const distractingSeconds = results
      .filter((item: any) => item.category === 'DISTRACTING')
      .reduce((sum: number, item: any) => sum + (item.totalDurationSeconds || 0), 0);

    const details = results.map((item: any) => ({
      tagName: item.tagName,
      duration: Math.round(item.totalDurationSeconds),
      percentage:
        totalSeconds > 0
          ? Number(((item.totalDurationSeconds / totalSeconds) * 100).toFixed(1))
          : 0,
      colorCode: item.colorCode || '#999999',
      category: item.category,
    }));

    return {
      summary: {
        totalSeconds: Math.round(totalSeconds),
        purposefulPercentage:
          totalSeconds > 0
            ? Number(((purposefulSeconds / totalSeconds) * 100).toFixed(1))
            : 0,
        distractingPercentage:
          totalSeconds > 0
            ? Number(((distractingSeconds / totalSeconds) * 100).toFixed(1))
            : 0,
      },
      details,
    };
  }

  private getStartDate(period: 'daily' | 'weekly' | 'monthly', date: Date): Date {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    if (period === 'daily') {
      return startDate;
    }

    if (period === 'weekly') {
      const day = startDate.getDay();
      const diff = startDate.getDate() - day;
      startDate.setDate(diff);
      return startDate;
    }

    if (period === 'monthly') {
      startDate.setDate(1);
      return startDate;
    }

    return startDate;
  }

  async getPurposeInsights(userId: string, fromStr: string, toStr: string) {
    const from = new Date(fromStr);
    const to = new Date(toStr);

    const pipeline: any[] = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          startedAt: { $lt: to },
          endedAt: { $gt: from },
        },
      },
      {
        $addFields: {
          effectiveStart: { $max: ['$startedAt', from] },
          effectiveEnd: { $min: ['$endedAt', to] },
          tagsArray: {
            $cond: {
              if: { $and: [{ $isArray: '$tags' }, { $gt: [{ $size: '$tags' }, 0] }] },
              then: '$tags',
              else: [{ tagName: 'Other' }],
            },
          },
        },
      },
      {
        $addFields: {
          effectiveDurationSecs: {
            $max: [
              0,
              { $divide: [{ $subtract: ['$effectiveEnd', '$effectiveStart'] }, 1000] },
            ],
          },
          numTags: { $size: '$tagsArray' },
        },
      },
      {
        $unwind: '$tagsArray',
      },
      {
        $addFields: {
          tagWeight: {
            $cond: {
              if: {
                $and: [
                  { $eq: [{ $type: '$tagsArray' }, 'object'] },
                  { $isNumber: '$tagsArray.weight' },
                ],
              },
              then: '$tagsArray.weight',
              else: { $divide: [1, '$numTags'] },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'purposetags',
          localField: 'tagsArray.tagName',
          foreignField: 'tagName',
          as: 'tagInfo',
        },
      },
      {
        $group: {
          _id: {
            tagName: {
              $cond: {
                if: { $eq: [{ $type: '$tagsArray' }, 'string'] },
                then: '$tagsArray',
                else: { $ifNull: ['$tagsArray.tagName', 'Other'] },
              },
            },
            category: {
              $cond: {
                if: { $gt: [{ $size: '$tagInfo' }, 0] },
                then: { $arrayElemAt: ['$tagInfo.category', 0] },
                else: 'NEUTRAL',
              },
            },
          },
          totalDurationSeconds: {
            $sum: { $multiply: ['$effectiveDurationSecs', '$tagWeight'] },
          },
        },
      },
    ];

    const aggResults = await this.sessionModel.aggregate(pipeline).exec();

    let totalDurationSeconds = 0;
    const categoryStats = new Map<string, number>();
    const formattedTags: any[] = [];

    for (const res of aggResults) {
      const tagName = res._id.tagName;
      const category = res._id.category || 'NEUTRAL';
      const duration = res.totalDurationSeconds || 0;

      totalDurationSeconds += duration;

      categoryStats.set(category, (categoryStats.get(category) || 0) + duration);

      formattedTags.push({
        tagName,
        category,
        totalDurationSeconds: Math.round(duration),
        percentage: 0, // Will calculate below
      });
    }

    // Calculate percentages for tags
    for (const tag of formattedTags) {
      tag.percentage =
        totalDurationSeconds > 0
          ? Number(((tag.totalDurationSeconds / totalDurationSeconds) * 100).toFixed(1))
          : 0;
    }

    // Process categories
    const categories: any[] = [];
    for (const [category, duration] of categoryStats.entries()) {
      categories.push({
        category,
        totalDurationSeconds: Math.round(duration),
        percentage:
          totalDurationSeconds > 0
            ? Number(((duration / totalDurationSeconds) * 100).toFixed(1))
            : 0,
      });
    }

    const purposefulDuration = categoryStats.get('PURPOSEFUL') || 0;
    const distractingDuration = categoryStats.get('DISTRACTING') || 0;

    return {
      totalDurationSeconds: Math.round(totalDurationSeconds),
      purposefulPercentage:
        totalDurationSeconds > 0
          ? Number(((purposefulDuration / totalDurationSeconds) * 100).toFixed(1))
          : 0,
      distractingPercentage:
        totalDurationSeconds > 0
          ? Number(((distractingDuration / totalDurationSeconds) * 100).toFixed(1))
          : 0,
      categories: categories.sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds),
      tags: formattedTags.sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds),
    };
  }

  async getSessionsByUserId(
    userId: string,
    filters?: {
      dateFrom?: string;
      dateTo?: string;
      appId?: string;
      status?: 'classified' | 'unclassified';
      page?: number;
      limit?: number;
    },
  ) {
    const query: any = { userId };
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    if (filters?.dateFrom || filters?.dateTo) {
      query.sessionDate = {};
      if (filters.dateFrom) {
        query.sessionDate.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.sessionDate.$lte = new Date(filters.dateTo);
      }
    }

    if (filters?.appId) {
      query.appId = filters.appId;
    }

    if (filters?.status === 'classified') {
      query.tags = { $exists: true, $ne: [] };
    } else if (filters?.status === 'unclassified') {
      query.$or = [{ tags: { $exists: false } }, { tags: [] }];
    }

    const total = await this.sessionModel.countDocuments(query);
    const sessions = await this.sessionModel
      .find(query)
      .populate('appId', 'appName packageName category')
      .sort({ sessionDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data: sessions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSessionsByDate(userId: string, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sessions = await this.sessionModel
      .find({
        userId,
        sessionDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .populate('appId', 'appName packageName category')
      .sort({ startedAt: 1 })
      .exec();

    return sessions;
  }

  async getUnclassifiedSessions(userId: string) {
    const sessions = await this.sessionModel
      .find({
        userId,
        $or: [{ tags: { $exists: false } }, { tags: { $size: 0 } }],
      })
      .populate('appId', 'appName packageName category')
      .sort({ sessionDate: -1 })
      .exec();

    return sessions;
  }

  async getSessionById(sessionId: string) {
    if (!sessionId) {
      throw new InvalidInputException('sessionId', 'Session ID is required');
    }

    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session) {
      throw new SessionNotFoundException(sessionId);
    }
    return session;
  }

  async updateSession(sessionId: string, updateData: any) {
    const session = await this.sessionModel
      .findByIdAndUpdate(sessionId, updateData, { new: true })
      .populate('appId', 'appName packageName category')
      .exec();
    if (!session) {
      throw new Error('Session not found');
    }
    return session;
  }

  async classifySession(sessionId: string, classifyData: any) {
    const { tags, note } = classifyData;

    const session = await this.sessionModel
      .findByIdAndUpdate(
        sessionId,
        {
          tags: Array.isArray(tags) ? tags : [tags],
          note,
          classifiedAt: new Date(),
        },
        { new: true },
      )
      .populate('appId', 'appName packageName category')
      .exec();

    if (!session) {
      throw new Error('Session not found');
    }
    return session;
  }

  async deleteSession(sessionId: string) {
    const session = await this.sessionModel
      .findByIdAndDelete(sessionId)
      .exec();
    if (!session) {
      throw new SessionNotFoundException(sessionId);
    }
    return session;
  }
}