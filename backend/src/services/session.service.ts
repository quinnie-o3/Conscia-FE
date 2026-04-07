import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(UsageSession.name) private sessionModel: Model<UsageSession>,
  ) { }

  async createSession(userId: string, sessionData: any) {
    const { deviceId, appId, startTime, endTime, date } = sessionData;

    const duration = new Date(endTime).getTime() - new Date(startTime).getTime();

    const newSession = await this.sessionModel.create({
      userId,
      deviceId,
      appId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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
          new Date(session.endTime).getTime() -
          new Date(session.startTime).getTime();

        return {
          userId,
          deviceId: session.deviceId,
          appId: session.appId,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime),
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
      .sort({ startTime: 1 })
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
    const session = await this.sessionModel
      .findById(sessionId)
      .populate('appId', 'appName packageName category')
      .exec();
    if (!session) {
      throw new Error('Session not found');
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
    const session = await this.sessionModel.findByIdAndDelete(sessionId).exec();
    if (!session) {
      throw new Error('Session not found');
    }
    return session;
  }
}