import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';
import {
  CreateSessionDto,
  CreateSessionsBatchDto,
  ClassifySessionDto,
  GetSessionsQueryDto,
  SyncSessionsBatchDto,
} from '../dtos/session.dto';

import { PurposeTag } from '../schemas/purpose-tag.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('sessions')
export class SessionController {
  constructor(
    private sessionService: SessionService,
    @InjectModel('PurposeTag') private tagModel: Model<any>,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.sessionService.createSession(
        user.userId,
        createSessionDto,
      );
      return {
        success: true,
        data: result,
        message: 'Session created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create session',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Post('batch')
  async createSessionsBatch(
    @Body() createSessionsBatchDto: CreateSessionsBatchDto,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.sessionService.createSessionsBatch(
        user.userId,
        createSessionsBatchDto.sessions,
      );
      return {
        success: true,
        data: result,
        message: `${result.length} sessions created successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create sessions',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async getSessions(
    @Query() query: GetSessionsQueryDto,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.sessionService.getSessionsByUserId(
        user.userId,
        {
          dateFrom: query.dateFrom,
          dateTo: query.dateTo,
          appId: query.appId,
          status: query.status as 'classified' | 'unclassified',
          page: query.page || 1,
          limit: query.limit || 20,
        },
      );
      return {
        success: true,
        data: result.data,
        pagination: result.pagination,
        message: 'Sessions retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get sessions',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Get('date/:date')
  async getSessionsByDate(
    @Param('date') date: string,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.sessionService.getSessionsByDate(
        user.userId,
        date,
      );
      return {
        success: true,
        data: result,
        message: 'Sessions retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get sessions',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Get('unclassified')
  async getUnclassifiedSessions(@CurrentUser() user: any) {
    try {
      const result = await this.sessionService.getUnclassifiedSessions(
        user.userId,
      );
      return {
        success: true,
        data: result,
        message: 'Unclassified sessions retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get unclassified sessions',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Get(':sessionId')
  async getSessionById(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const session = await this.sessionService.getSessionById(sessionId);

      if (session.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This session does not belong to you',
        );
      }

      return {
        success: true,
        data: session,
        message: 'Session retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get session',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Put(':sessionId/classify')
  async classifySession(
    @Param('sessionId') sessionId: string,
    @Body() classifySessionDto: ClassifySessionDto,
    @CurrentUser() user: any,
  ) {
    try {
      const session = await this.sessionService.getSessionById(sessionId);

      if (session.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This session does not belong to you',
        );
      }

      const result = await this.sessionService.classifySession(
        sessionId,
        classifySessionDto,
      );
      return {
        success: true,
        data: result,
        message: 'Session classified successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to classify session',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Put(':sessionId')
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    try {
      const session = await this.sessionService.getSessionById(sessionId);

      if (session.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This session does not belong to you',
        );
      }

      const result = await this.sessionService.updateSession(sessionId, body);
      return {
        success: true,
        data: result,
        message: 'Session updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update session',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':sessionId')
  async deleteSession(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const session = await this.sessionService.getSessionById(sessionId);

      if (session.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This session does not belong to you',
        );
      }

      const result = await this.sessionService.deleteSession(sessionId);
      return {
        success: true,
        data: result,
        message: 'Session deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete session',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Post('sync')
  async syncSessions(
    @Body() dto: SyncSessionsBatchDto,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.sessionService.syncSessions(user.userId, dto.sessions);
      return {
        success: true,
        data: result,
        message: `${result.count} sessions synced successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to sync sessions',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Get('insights/purpose')
  async getPurposeInsights(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('userId') queryUserId: string,
    @CurrentUser() user: any,
  ) {
    try {
      if (!from || !to) {
        throw new Error('from and to query parameters are required');
      }
      
      const targetUserId = queryUserId || user.userId;
      
      if (targetUserId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException('You can only view your own insights');
      }

      const result = await this.sessionService.getPurposeInsights(targetUserId, from, to);
      return result; // returning directly as requested by schema format or wrap in success? App expects exactly this format. Let's return it directly. Wait, the prompt says "Ví dụ backend có thể trả về: { totalDurationSeconds: 6000, ... }". So return it directly or inside `data`? I'll return it directly since it's an API specifically for an app view. Actually, existing APIs wrap in `{ success, data, message }`. But prompt example is flat. I'll return it directly as requested.
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get insights',
      };
    }
  }

  @Post('seed-purpose-tags')
  async seedPurposeTags() {
    try {
      const tagsToSeed = [
        { tagName: 'Learning', category: 'PURPOSEFUL', colorCode: '#4CAF50' },
        { tagName: 'Work', category: 'PURPOSEFUL', colorCode: '#2196F3' },
        { tagName: 'Entertainment', category: 'DISTRACTING', colorCode: '#FF9800' },
        { tagName: 'Social', category: 'DISTRACTING', colorCode: '#E91E63' },
        { tagName: 'Other', category: 'NEUTRAL', colorCode: '#9E9E9E' }
      ];

      for (const tag of tagsToSeed) {
        await this.tagModel.findOneAndUpdate(
          { tagName: tag.tagName },
          { $set: tag },
          { upsert: true }
        );
      }
      
      return { success: true, message: 'Purpose tags seeded successfully' };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to seed tags',
      };
    }
  }
}