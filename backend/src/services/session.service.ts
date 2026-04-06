import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsageSession } from '../schemas/usage-session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(UsageSession.name)
    private sessionModel: Model<UsageSession>,
  ) {}

  /**
   * Create session
   */
  async createSession(userId: string, sessionData: any) {
    // Calculate duration
    let durationSeconds = 0;
    if (sessionData.endTime && sessionData.startTime) {
      durationSeconds = Math.floor(
        (new Date(sessionData.endTime).getTime() -
          new Date(sessionData.startTime).getTime()) /
          1000,
      );
    } else {
      durationSeconds = sessionData.durationSeconds || 0;
    }

    const session = await this.sessionModel.create({
      userId,
      ...sessionData,
      durationSeconds,
      sessionDate: new Date(sessionData.startTime),
      isCompleted: !!sessionData.endTime,
      isClassified: false,
    });

    return {
      sessionId: session._id,
      userId: session.userId,
      appId: session.appId,
      durationSeconds: session.durationSeconds,
      startTime: session.startTime,
      endTime: session.endTime,
      createdAt: session.createdAt,
    };
  }

  /**
   * Get sessions by date
   */
  async getSessionsByDate(userId: string, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sessions = await this.sessionModel
      .find({
        userId,
        sessionDate: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate(['appId']);

    return sessions.map((s) => ({
      sessionId: s._id,
      userId: s.userId,
      appId: s.appId,
      durationSeconds: s.durationSeconds,
      startTime: s.startTime,
      isClassified: s.isClassified,
      tags: s.tags || [],
    }));
  }

  /**
   * Get unclassified sessions
   */
  async getUnclassifiedSessions(userId: string) {
    const sessions = await this.sessionModel
      .find({ userId, isClassified: false })
      .sort({ startTime: -1 })
      .populate(['appId']);

    return sessions.map((s) => ({
      sessionId: s._id,
      appId: s.appId,
      durationSeconds: s.durationSeconds,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
  }

  /**
   * Classify session with tags
   */
  async classifySession(sessionId: string, tags: any[], note: string) {
    const session = await this.sessionModel.findByIdAndUpdate(
      sessionId,
      {
        tags: tags.map((tag) => ({
          ...tag,
          classifiedAt: new Date(),
        })),
        isClassified: true,
      },
      { new: true },
    );

    if (!session) {
      throw new Error('Session not found');
    }

    return {
      sessionId: session._id,
      isClassified: true,
      tags: session.tags,
    };
  }

  /**
   * Update session
   */
  async updateSession(sessionId: string, updateData: any) {
    const session = await this.sessionModel.findByIdAndUpdate(
      sessionId,
      updateData,
      { new: true },
    );

    if (!session) {
      throw new Error('Session not found');
    }

    return {
      sessionId: session._id,
      durationSeconds: session.durationSeconds,
      updatedAt: session.updatedAt,
    };
  }

  /**
   * Delete session
   */
  async deleteSession(sessionId: string) {
    const session = await this.sessionModel.findByIdAndDelete(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    return { message: 'Session deleted successfully' };
  }
}
