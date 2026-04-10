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
} from '../dtos/session.dto';

@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) {}

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
}