import {
    Controller,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from '../services/statistics.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
    ScreenTimeQueryDto,
    TopAppsQueryDto,
    UsageByPurposeQueryDto,
    TrendQueryDto,
    InsightsQueryDto,
    PeriodEnum,
} from '../dtos/stats.dto';

@ApiTags('Statistics')
@ApiBearerAuth()
@Controller('stats')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) { }

    @UseGuards(JwtGuard)
    @Get('screen-time')
    async getScreenTime(
        @Query() query: ScreenTimeQueryDto,
        @CurrentUser() user: any,
    ) {
        try {
            const period = query.period || PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];

            const result = await this.statisticsService.getScreenTime(
                user.userId,
                period as 'daily' | 'weekly' | 'monthly',
                date,
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

    @UseGuards(JwtGuard)
    @Get('top-apps')
    async getTopApps(
        @Query() query: TopAppsQueryDto,
        @CurrentUser() user: any,
    ) {
        try {
            const period = query.period || PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];
            const limit = query.limit || 5;

            const result = await this.statisticsService.getTopApps(
                user.userId,
                period as 'daily' | 'weekly' | 'monthly',
                date,
                limit,
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

    @UseGuards(JwtGuard)
    @Get('by-purpose')
    async getUsageByPurpose(
        @Query() query: UsageByPurposeQueryDto,
        @CurrentUser() user: any,
    ) {
        try {
            const period = query.period || PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];

            const result = await this.statisticsService.getUsageByPurpose(
                user.userId,
                period as 'daily' | 'weekly' | 'monthly',
                date,
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

    @UseGuards(JwtGuard)
    @Get('trend')
    async getTrend(
        @Query() query: TrendQueryDto,
        @CurrentUser() user: any,
    ) {
        try {
            if (!query.startDate || !query.endDate) {
                return {
                    success: false,
                    error: 'startDate and endDate are required',
                    message: 'Missing required parameters',
                };
            }

            const result = await this.statisticsService.getTrend(
                user.userId,
                query.startDate,
                query.endDate,
            );
            return {
                success: true,
                data: result,
                message: 'Trend retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get trend',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get('insights')
    async getInsights(
        @Query() query: InsightsQueryDto,
        @CurrentUser() user: any,
    ) {
        try {
            const period = query.period || PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];

            const result = await this.statisticsService.getInsights(
                user.userId,
                period as 'daily' | 'weekly' | 'monthly',
                date,
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

    @UseGuards(JwtGuard)
    @Get('goals-progress')
    async getGoalProgress(@CurrentUser() user: any) {
        try {
            const result = await this.statisticsService.getGoalProgress(user.userId);
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