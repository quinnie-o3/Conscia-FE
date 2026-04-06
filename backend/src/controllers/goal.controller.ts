import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from '../services/goal.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

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
    @CurrentUser('userId') currentUserId: string,
    @Body()
    body: {
      userId: string;
      goalName: string;
      goalType: string;
      targetValue: number;
    },
  ) {
    try {
      const result = await this.goalService.createGoal(currentUserId, body);
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
   * GET /goals/active
   * Get active goals of authenticated user
   */
  @Get('active')
  async getActiveGoals(@CurrentUser('userId') userId: string) {
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
   * GET /goals
   * Get all goals of authenticated user
   */
  @Get()
  async getUserGoals(@CurrentUser('userId') userId: string) {
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
