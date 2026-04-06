import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsService, Period } from '../services/statistics.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('stats')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  /**
   * GET /stats/screen-time?period=daily&date=2026-04-06
   * Get total screen time for a period
   */
  @Get('screen-time')
  async getTotalScreenTime(
    @CurrentUser('userId') userId: string,
    @Query('period') period: string = 'daily',
    @Query('date') date: string,
  ) {
    try {
      const anchorDate = date || new Date().toISOString().split('T')[0];
      const result = await this.statisticsService.getTotalScreenTime(
        userId,
        (period as Period) || 'daily',
        anchorDate,
      );
      return {
        success: true,
        data: result,
        message: 'Screen time retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get screen time',
      };
    }
  }

  /**
   * GET /stats/top-apps?period=weekly&date=2026-04-06&limit=10
   * Get top used apps for a period
   */
  @Get('top-apps')
  async getTopApps(
    @CurrentUser('userId') userId: string,
    @Query('period') period: string = 'daily',
    @Query('date') date: string,
    @Query('limit') limit: string = '10',
  ) {
    try {
      const anchorDate = date || new Date().toISOString().split('T')[0];
      const result = await this.statisticsService.getTopApps(
        userId,
        (period as Period) || 'daily',
        anchorDate,
        parseInt(limit, 10) || 10,
      );
      return {
        success: true,
        data: result,
        message: 'Top apps retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get top apps',
      };
    }
  }

  /**
   * GET /stats/by-purpose?period=monthly&date=2026-04-06
   * Get usage distribution by purpose/tag
   */
  @Get('by-purpose')
  async getUsageByPurpose(
    @CurrentUser('userId') userId: string,
    @Query('period') period: string = 'daily',
    @Query('date') date: string,
  ) {
    try {
      const anchorDate = date || new Date().toISOString().split('T')[0];
      const result = await this.statisticsService.getUsageByPurpose(
        userId,
        (period as Period) || 'daily',
        anchorDate,
      );
      return {
        success: true,
        data: result,
        message: 'Usage by purpose retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get usage by purpose',
      };
    }
  }

  /**
   * GET /stats/trend?startDate=2026-04-01&endDate=2026-04-07
   * Get daily screen time trend
   */
  @Get('trend')
  async getDailyTrend(
    @CurrentUser('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    try {
      const msPerDay = 24 * 60 * 60 * 1000;
      const daysBack = 6;
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - daysBack * msPerDay)
        .toISOString()
        .split('T')[0];

      const result = await this.statisticsService.getDailyTrend(
        userId,
        startDate || weekAgo,
        endDate || today,
      );
      return {
        success: true,
        data: result,
        message: 'Trend data retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get trend data',
      };
    }
  }

  /**
   * GET /stats/insights?period=weekly&date=2026-04-06
   * Get insights: most distracting apps, peak usage times, common purposes
   */
  @Get('insights')
  async getInsights(
    @CurrentUser('userId') userId: string,
    @Query('period') period: string = 'weekly',
    @Query('date') date: string,
  ) {
    try {
      const anchorDate = date || new Date().toISOString().split('T')[0];
      const result = await this.statisticsService.getInsights(
        userId,
        (period as Period) || 'weekly',
        anchorDate,
      );
      return {
        success: true,
        data: result,
        message: 'Insights retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get insights',
      };
    }
  }

  /**
   * GET /stats/goals-progress
   * Get progress for all active goals
   */
  @Get('goals-progress')
  async getGoalProgress(@CurrentUser('userId') userId: string) {
    try {
      const result = await this.statisticsService.getGoalProgress(userId);
      return {
        success: true,
        data: result,
        message: 'Goal progress retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get goal progress',
      };
    }
  }
}
