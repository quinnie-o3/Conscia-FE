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
import { SessionService } from '../services/session.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

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
    @CurrentUser('userId') currentUserId: string,
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
      const result = await this.sessionService.createSession(
        currentUserId,
        body,
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

  /**
   * GET /sessions/date?date=2026-04-05
   * Get sessions by date for authenticated user
   */
  @Get('date')
  async getSessionsByDate(
    @CurrentUser('userId') userId: string,
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
   * GET /sessions/unclassified
   * Get unclassified sessions for authenticated user
   */
  @Get('unclassified')
  async getUnclassifiedSessions(@CurrentUser('userId') userId: string) {
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
