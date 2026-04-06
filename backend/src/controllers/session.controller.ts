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
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { SessionService } from '../services/session.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  /**
   * POST /sessions
   * Create new session
   */
  @Post()
  async createSession(
    @Body()
    body: {
      userId: string;
      deviceId: string;
      appId: string;
      startTime: string;
      endTime?: string;
    },
  ) {
    try {
      const result = await this.sessionService.createSession(body.userId, body);
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

  /**
   * GET /sessions/date?userId=xxx&date=2026-04-05
   * Get sessions by date
   */
  @Get('date')
  async getSessionsByDate(
    @Query('userId') userId: string,
    @Query('date') date: string,
  ) {
    try {
      const result = await this.sessionService.getSessionsByDate(userId, date);
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

  /**
   * GET /sessions/unclassified?userId=xxx
   * Get unclassified sessions
   */
  @Get('unclassified')
  async getUnclassifiedSessions(@Query('userId') userId: string) {
    try {
      const result = await this.sessionService.getUnclassifiedSessions(userId);
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

  /**
   * PUT /sessions/:sessionId/classify
   * Classify session with tags
   */
  @Put(':sessionId/classify')
  async classifySession(
    @Param('sessionId') sessionId: string,
    @Body() body: { tags: any[]; note: string },
  ) {
    try {
      const result = await this.sessionService.classifySession(
        sessionId,
        body.tags,
        body.note,
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

  /**
   * PUT /sessions/:sessionId
   * Update session
   */
  @Put(':sessionId')
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() body: any,
  ) {
    try {
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

  /**
   * DELETE /sessions/:sessionId
   * Delete session
   */
  @Delete(':sessionId')
  async deleteSession(@Param('sessionId') sessionId: string) {
    try {
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
}
