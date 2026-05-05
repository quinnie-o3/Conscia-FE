"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const goal_schema_1 = require("../schemas/goal.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let GoalService = class GoalService {
    goalModel;
    constructor(goalModel) {
        this.goalModel = goalModel;
    }
    async createGoal(userId, goalData) {
        const { goalType, targetValue, periodType, appId, } = goalData;
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
    async getGoalById(goalId) {
        if (!goalId) {
            throw new custom_exceptions_1.InvalidInputException('goalId', 'Goal ID is required');
        }
        const goal = await this.goalModel
            .findById(goalId)
            .populate('appId', 'appName packageName')
            .exec();
        if (!goal) {
            throw new custom_exceptions_1.GoalNotFoundException(goalId);
        }
        return goal;
    }
    async getGoalsByUserId(userId) {
        const goals = await this.goalModel
            .find({ userId })
            .populate('appId', 'appName packageName')
            .sort({ createdAt: -1 })
            .exec();
        return goals;
    }
    async getActiveGoals(userId) {
        const goals = await this.goalModel
            .find({ userId, status: 'ACTIVE' })
            .populate('appId', 'appName packageName')
            .sort({ createdAt: -1 })
            .exec();
        return goals;
    }
    async updateGoal(goalId, updateData) {
        const goal = await this.goalModel
            .findByIdAndUpdate(goalId, updateData, { new: true })
            .populate('appId', 'appName packageName')
            .exec();
        if (!goal) {
            throw new Error('Goal not found');
        }
        return goal;
    }
    async deleteGoal(goalId) {
        const goal = await this.goalModel.findByIdAndDelete(goalId).exec();
        if (!goal) {
            throw new custom_exceptions_1.GoalNotFoundException(goalId);
        }
        return goal;
    }
    async deactivateGoal(goalId) {
        const goal = await this.goalModel
            .findByIdAndUpdate(goalId, { status: 'INACTIVE' }, { new: true })
            .exec();
        if (!goal) {
            throw new Error('Goal not found');
        }
        return goal;
    }
};
exports.GoalService = GoalService;
exports.GoalService = GoalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goal_schema_1.Goal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoalService);
//# sourceMappingURL=goal.service.js.map