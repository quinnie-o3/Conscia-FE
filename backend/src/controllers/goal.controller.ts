import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { GoalService } from '../services/goal.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

@Controller('goals')
export class GoalController {
  constructor(private goalService: GoalService) { }

  @UseGuards(JwtGuard)
  @Post()
  async createGoal(
    @Body()
    body: {
      goalType: string;
      targetValue: number;
      periodType: string;
      appId?: string;
    },
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.goalService.createGoal(user.userId, body);
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

  @UseGuards(JwtGuard)
  @Get()
  async getGoals(@CurrentUser() user: any) {
    try {
      const result = await this.goalService.getGoalsByUserId(user.userId);
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

  @UseGuards(JwtGuard)
  @Get('active')
  async getActiveGoals(@CurrentUser() user: any) {
    try {
      const result = await this.goalService.getActiveGoals(user.userId);
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

  @UseGuards(JwtGuard)
  @Get(':goalId')
  async getGoalById(
    @Param('goalId') goalId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const goal = await this.goalService.getGoalById(goalId);

      if (goal.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This goal does not belong to you',
        );
      }

      return {
        success: true,
        data: goal,
        message: 'Goal retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get goal',
      };
    }
  }

  @UseGuards(JwtGuard)
  @Put(':goalId')
  async updateGoal(
    @Param('goalId') goalId: string,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    try {
      const goal = await this.goalService.getGoalById(goalId);

      if (goal.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This goal does not belong to you',
        );
      }

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

  @UseGuards(JwtGuard)
  @Delete(':goalId')
  async deleteGoal(
    @Param('goalId') goalId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const goal = await this.goalService.getGoalById(goalId);

      if (goal.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This goal does not belong to you',
        );
      }

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

  @UseGuards(JwtGuard)
  @Put(':goalId/deactivate')
  async deactivateGoal(
    @Param('goalId') goalId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const goal = await this.goalService.getGoalById(goalId);

      if (goal.userId !== user.userId && user.role !== 'ADMIN') {
        throw new UnauthorizedException(
          'This goal does not belong to you',
        );
      }

      const result = await this.goalService.deactivateGoal(goalId);
      return {
        success: true,
        data: result,
        message: 'Goal deactivated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to deactivate goal',
      };
    }
  }
}