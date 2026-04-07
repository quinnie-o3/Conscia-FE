import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goal } from '../schemas/goal.schema';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
  ) { }

  async createGoal(userId: string, goalData: any) {
    const {
      goalType,
      targetValue,
      periodType,
      appId,
    } = goalData;

    const newGoal = await this.goalModel.create({
      userId,
      goalType,
      targetValue,
      periodType,
      appId: appId || null,
      status: 'ACTIVE',
      createdAt: new Date(),
    });

    return newGoal;
  }

  async getGoalById(goalId: string) {
    const goal = await this.goalModel
      .findById(goalId)
      .populate('appId', 'appName packageName')
      .exec();
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }

  async getGoalsByUserId(userId: string) {
    const goals = await this.goalModel
      .find({ userId })
      .populate('appId', 'appName packageName')
      .sort({ createdAt: -1 })
      .exec();

    return goals;
  }

  async getActiveGoals(userId: string) {
    const goals = await this.goalModel
      .find({ userId, status: 'ACTIVE' })
      .populate('appId', 'appName packageName')
      .sort({ createdAt: -1 })
      .exec();

    return goals;
  }

  async updateGoal(goalId: string, updateData: any) {
    const goal = await this.goalModel
      .findByIdAndUpdate(goalId, updateData, { new: true })
      .populate('appId', 'appName packageName')
      .exec();

    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }

  async deleteGoal(goalId: string) {
    const goal = await this.goalModel.findByIdAndDelete(goalId).exec();
    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }

  async deactivateGoal(goalId: string) {
    const goal = await this.goalModel
      .findByIdAndUpdate(goalId, { status: 'INACTIVE' }, { new: true })
      .exec();

    if (!goal) {
      throw new Error('Goal not found');
    }
    return goal;
  }
}