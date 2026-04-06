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
import { GoalService } from '../services/goal.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('goals')
export class GoalController {
  constructor(private goalService: GoalService) {}

  /**
   * POST /goals
   * Create new goal
   */
  @Post()
  async createGoal(
    @Body()
    body: {
      userId: string;
      goalName: string;
      goalType: string;
      targetValue: number;
    },
  ) {
    try {
      const result = await this.goalService.createGoal(body.userId, body);
      return {
        success: true,
        data: result,
        message: 'Goal created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create goal',
      };
    }
  }

  /**
   * GET /goals/active?userId=xxx
   * Get active goals of user
   */
  @Get('active')
  async getActiveGoals(@Query('userId') userId: string) {
    try {
      const result = await this.goalService.getActiveGoals(userId);
      return {
        success: true,
        data: result,
        message: 'Active goals retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get active goals',
      };
    }
  }

  /**
   * GET /goals?userId=xxx
   * Get all goals of user
   */
  @Get()
  async getUserGoals(@Query('userId') userId: string) {
    try {
      const result = await this.goalService.getUserGoals(userId);
      return {
        success: true,
        data: result,
        message: 'Goals retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get goals',
      };
    }
  }

  /**
   * PUT /goals/:goalId
   * Update goal
   */
  @Put(':goalId')
  async updateGoal(@Param('goalId') goalId: string, @Body() body: any) {
    try {
      const result = await this.goalService.updateGoal(goalId, body);
      return {
        success: true,
        data: result,
        message: 'Goal updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update goal',
      };
    }
  }

  /**
   * DELETE /goals/:goalId
   * Delete goal
   */
  @Delete(':goalId')
  async deleteGoal(@Param('goalId') goalId: string) {
    try {
      const result = await this.goalService.deleteGoal(goalId);
      return {
        success: true,
        data: result,
        message: 'Goal deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete goal',
      };
    }
  }
}
