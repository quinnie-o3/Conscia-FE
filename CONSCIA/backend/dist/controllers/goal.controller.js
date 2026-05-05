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
exports.GoalController = void 0;
const common_1 = require("@nestjs/common");
const goal_service_1 = require("../services/goal.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const goal_dto_1 = require("../dtos/goal.dto");
let GoalController = class GoalController {
    goalService;
    constructor(goalService) {
        this.goalService = goalService;
    }
    async createGoal(createGoalDto, user) {
        try {
            const result = await this.goalService.createGoal(user.userId, createGoalDto);
            return {
                success: true,
                data: result,
                message: 'Goal created successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create goal',
            };
        }
    }
    async getGoals(user) {
        try {
            const result = await this.goalService.getGoalsByUserId(user.userId);
            return {
                success: true,
                data: result,
                message: 'Goals retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get goals',
            };
        }
    }
    async getActiveGoals(user) {
        try {
            const result = await this.goalService.getActiveGoals(user.userId);
            return {
                success: true,
                data: result,
                message: 'Active goals retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get active goals',
            };
        }
    }
    async getGoalById(goalId, user) {
        try {
            const goal = await this.goalService.getGoalById(goalId);
            if (goal.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This goal does not belong to you');
            }
            return {
                success: true,
                data: goal,
                message: 'Goal retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get goal',
            };
        }
    }
    async updateGoal(goalId, updateGoalDto, user) {
        try {
            const goal = await this.goalService.getGoalById(goalId);
            if (goal.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This goal does not belong to you');
            }
            const result = await this.goalService.updateGoal(goalId, updateGoalDto);
            return {
                success: true,
                data: result,
                message: 'Goal updated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update goal',
            };
        }
    }
    async deleteGoal(goalId, user) {
        try {
            const goal = await this.goalService.getGoalById(goalId);
            if (goal.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This goal does not belong to you');
            }
            const result = await this.goalService.deleteGoal(goalId);
            return {
                success: true,
                data: result,
                message: 'Goal deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete goal',
            };
        }
    }
    async deactivateGoal(goalId, user) {
        try {
            const goal = await this.goalService.getGoalById(goalId);
            if (goal.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This goal does not belong to you');
            }
            const result = await this.goalService.deactivateGoal(goalId);
            return {
                success: true,
                data: result,
                message: 'Goal deactivated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to deactivate goal',
            };
        }
    }
};
exports.GoalController = GoalController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_dto_1.CreateGoalDto, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "createGoal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "getGoals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('active'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "getActiveGoals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':goalId'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "getGoalById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':goalId'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, goal_dto_1.UpdateGoalDto, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':goalId'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "deleteGoal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':goalId/deactivate'),
    __param(0, (0, common_1.Param)('goalId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoalController.prototype, "deactivateGoal", null);
exports.GoalController = GoalController = __decorate([
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [goal_service_1.GoalService])
], GoalController);
//# sourceMappingURL=goal.controller.js.map