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
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_service_1 = require("../services/session.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const session_dto_1 = require("../dtos/session.dto");
const stats_dto_1 = require("../dtos/stats.dto");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let SessionController = class SessionController {
    sessionService;
    tagModel;
    constructor(sessionService, tagModel) {
        this.sessionService = sessionService;
        this.tagModel = tagModel;
    }
    async createSession(createSessionDto, user) {
        try {
            const result = await this.sessionService.createSession(user.userId, createSessionDto);
            return {
                success: true,
                data: result,
                message: 'Session created successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create session',
            };
        }
    }
    async createSessionsBatch(createSessionsBatchDto, user) {
        try {
            const result = await this.sessionService.createSessionsBatch(user.userId, createSessionsBatchDto.sessions);
            return {
                success: true,
                data: result,
                message: `${result.length} sessions created successfully`,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create sessions',
            };
        }
    }
    async getSessions(query, user) {
        try {
            const result = await this.sessionService.getSessionsByUserId(user.userId, {
                dateFrom: query.dateFrom,
                dateTo: query.dateTo,
                appId: query.appId,
                status: query.status,
                page: query.page || 1,
                limit: query.limit || 20,
            });
            return {
                success: true,
                data: result.data,
                pagination: result.pagination,
                message: 'Sessions retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get sessions',
            };
        }
    }
    async getSessionsByDate(date, user) {
        try {
            const result = await this.sessionService.getSessionsByDate(user.userId, date);
            return {
                success: true,
                data: result,
                message: 'Sessions retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get sessions',
            };
        }
    }
    async getUnclassifiedSessions(user) {
        try {
            const result = await this.sessionService.getUnclassifiedSessions(user.userId);
            return {
                success: true,
                data: result,
                message: 'Unclassified sessions retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get unclassified sessions',
            };
        }
    }
    async getSessionById(sessionId, user) {
        try {
            const session = await this.sessionService.getSessionById(sessionId);
            if (session.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This session does not belong to you');
            }
            return {
                success: true,
                data: session,
                message: 'Session retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get session',
            };
        }
    }
    async classifySession(sessionId, classifySessionDto, user) {
        try {
            const session = await this.sessionService.getSessionById(sessionId);
            if (session.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This session does not belong to you');
            }
            const result = await this.sessionService.classifySession(sessionId, classifySessionDto);
            return {
                success: true,
                data: result,
                message: 'Session classified successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to classify session',
            };
        }
    }
    async updateSession(sessionId, body, user) {
        try {
            const session = await this.sessionService.getSessionById(sessionId);
            if (session.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This session does not belong to you');
            }
            const result = await this.sessionService.updateSession(sessionId, body);
            return {
                success: true,
                data: result,
                message: 'Session updated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update session',
            };
        }
    }
    async deleteSession(sessionId, user) {
        try {
            const session = await this.sessionService.getSessionById(sessionId);
            if (session.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This session does not belong to you');
            }
            const result = await this.sessionService.deleteSession(sessionId);
            return {
                success: true,
                data: result,
                message: 'Session deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete session',
            };
        }
    }
    async syncSessions(dto, user) {
        try {
            const result = await this.sessionService.syncSessions(user.userId, dto);
            return {
                success: true,
                data: result,
                message: `${result.count} sessions synced successfully`,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to sync sessions',
            };
        }
    }
    async getPurposeInsights(query, user) {
        try {
            const result = await this.sessionService.getUsageByPurpose(user.userId, {
                period: query.period,
                date: query.date,
            });
            return {
                success: true,
                data: result,
                message: 'Purpose insights retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get purpose insights',
            };
        }
    }
    async seedPurposeTags() {
        try {
            const tagsToSeed = [
                { tagName: 'Learning', category: 'PURPOSEFUL', colorCode: '#4CAF50' },
                { tagName: 'Work', category: 'PURPOSEFUL', colorCode: '#2196F3' },
                { tagName: 'Entertainment', category: 'DISTRACTING', colorCode: '#FF9800' },
                { tagName: 'Social', category: 'DISTRACTING', colorCode: '#E91E63' },
                { tagName: 'Other', category: 'NEUTRAL', colorCode: '#9E9E9E' }
            ];
            for (const tag of tagsToSeed) {
                await this.tagModel.findOneAndUpdate({ tagName: tag.tagName }, { $set: tag }, { upsert: true });
            }
            return { success: true, message: 'Purpose tags seeded successfully' };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to seed tags',
            };
        }
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.CreateSessionDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "createSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('batch'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.CreateSessionsBatchDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "createSessionsBatch", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.GetSessionsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('date/:date'),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionsByDate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('unclassified'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getUnclassifiedSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':sessionId/classify'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, session_dto_1.ClassifySessionDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "classifySession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "updateSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_dto_1.SyncSessionsBatchDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "syncSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('insights/purpose'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stats_dto_1.InsightsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getPurposeInsights", null);
__decorate([
    (0, common_1.Post)('seed-purpose-tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "seedPurposeTags", null);
exports.SessionController = SessionController = __decorate([
    (0, swagger_1.ApiTags)('Sessions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('sessions'),
    __param(1, (0, mongoose_2.InjectModel)('PurposeTag')),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        mongoose_1.Model])
], SessionController);
//# sourceMappingURL=session.controller.js.map