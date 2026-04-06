import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goal } from '../schemas/goal.schema';

@Injectable()
export class GoalService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<Goal>) {}

  /**
   * Create goal
   */
  async createGoal(userId: string, goalData: any) {
    const goal = await this.goalModel.create({
      userId,
      ...goalData,
      status: 'ACTIVE',
      currentProgress: 0,
    });

    return {
      goalId: goal._id,
      userId: goal.userId,
      goalName: goal.goalName,
      targetValue: goal.targetValue,
      status: goal.status,
      createdAt: goal.createdAt,
    };
  }

  /**
   * Get active goals of user
   */
  async getActiveGoals(userId: string) {
    const goals = await this.goalModel.find({
      userId,
      status: 'ACTIVE',
    });

    return goals.map((g) => ({
      goalId: g._id,
      goalName: g.goalName,
      goalType: g.goalType,
      targetValue: g.targetValue,
      currentProgress: g.currentProgress,
      status: g.status,
    }));
  }

  /**
   * Get all goals of user
   */
  async getUserGoals(userId: string) {
    const goals = await this.goalModel.find({ userId });
    return goals.map((g) => ({
      goalId: g._id,
      goalName: g.goalName,
      targetValue: g.targetValue,
      currentProgress: g.currentProgress,
      status: g.status,
    }));
  }

  /**
   * Update goal
   */
  async updateGoal(goalId: string, updateData: any) {
    const goal = await this.goalModel.findByIdAndUpdate(goalId, updateData, {
      new: true,
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    return {
      goalId: goal._id,
      goalName: goal.goalName,
      currentProgress: goal.currentProgress,
      status: goal.status,
    };
  }

  /**
   * Delete goal
   */
  async deleteGoal(goalId: string) {
    const goal = await this.goalModel.findByIdAndDelete(goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }
    return { message: 'Goal deleted successfully' };
  }
}
