import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('daily')
  async getDailySummary(
    @Query('anonymousUserId') anonymousUserId: string,
    @Query('deviceId') deviceId: string,
    @Query('date') date: string,
  ) {
    const data = await this.statsService.getDailySummary(
      anonymousUserId,
      deviceId,
      date,
    );

    return {
      success: true,
      message: 'Daily summary retrieved successfully',
      data,
    };
  }
}