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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const statistics_service_1 = require("../services/statistics.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const stats_dto_1 = require("../dtos/stats.dto");
let StatisticsController = class StatisticsController {
    statisticsService;
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getScreenTime(query, user) {
        try {
            const period = query.period || stats_dto_1.PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];
            const result = await this.statisticsService.getScreenTime(user.userId, period, date);
            return {
                success: true,
                data: result,
                message: 'Screen time retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get screen time',
            };
        }
    }
    async getTopApps(query, user) {
        try {
            const period = query.period || stats_dto_1.PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];
            const limit = query.limit || 5;
            const result = await this.statisticsService.getTopApps(user.userId, period, date, limit);
            return {
                success: true,
                data: result,
                message: 'Top apps retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get top apps',
            };
        }
    }
    async getUsageByPurpose(query, user) {
        try {
            const period = query.period || stats_dto_1.PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];
            const result = await this.statisticsService.getUsageByPurpose(user.userId, period, date);
            return {
                success: true,
                data: result,
                message: 'Usage by purpose retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get usage by purpose',
            };
        }
    }
    async getTrend(query, user) {
        try {
            if (!query.startDate || !query.endDate) {
                return {
                    success: false,
                    error: 'startDate and endDate are required',
                    message: 'Missing required parameters',
                };
            }
            const result = await this.statisticsService.getTrend(user.userId, query.startDate, query.endDate);
            return {
                success: true,
                data: result,
                message: 'Trend retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get trend',
            };
        }
    }
    async getInsights(query, user) {
        try {
            const period = query.period || stats_dto_1.PeriodEnum.DAILY;
            const date = query.date || new Date().toISOString().split('T')[0];
            const result = await this.statisticsService.getInsights(user.userId, period, date);
            return {
                success: true,
                data: result,
                message: 'Insights retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get insights',
            };
        }
    }
    async getGoalProgress(user) {
        try {
            const result = await this.statisticsService.getGoalProgress(user.userId);
            return {
                success: true,
                data: result,
                message: 'Goal progress retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get goal progress',
            };
        }
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('screen-time'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.ScreenTimeQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getScreenTime", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('top-apps'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.TopAppsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTopApps", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('by-purpose'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.UsageByPurposeQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getUsageByPurpose", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('trend'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.TrendQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTrend", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('insights'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.InsightsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getInsights", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('goals-progress'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getGoalProgress", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, swagger_1.ApiTags)('Statistics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map