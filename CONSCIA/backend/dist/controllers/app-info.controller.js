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
exports.AppInfoController = void 0;
const common_1 = require("@nestjs/common");
const app_info_service_1 = require("../services/app-info.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const app_dto_1 = require("../dtos/app.dto");
let AppInfoController = class AppInfoController {
    appInfoService;
    constructor(appInfoService) {
        this.appInfoService = appInfoService;
    }
    async getAllApps(category) {
        try {
            const result = await this.appInfoService.getAllApps(category);
            return {
                success: true,
                data: result,
                message: 'Applications retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get applications',
            };
        }
    }
    async getAppById(appId) {
        try {
            const result = await this.appInfoService.getAppById(appId);
            return {
                success: true,
                data: result,
                message: 'Application retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get application',
            };
        }
    }
    async createApp(createAppDto, user) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can create applications',
                    message: 'Unauthorized',
                };
            }
            const result = await this.appInfoService.createApp(createAppDto.packageName, createAppDto.appName, createAppDto.category, createAppDto.iconReference);
            return {
                success: true,
                data: result,
                message: 'Application created successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create application',
            };
        }
    }
    async updateApp(appId, updateAppDto, user) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can update applications',
                    message: 'Unauthorized',
                };
            }
            const result = await this.appInfoService.updateApp(appId, updateAppDto);
            return {
                success: true,
                data: result,
                message: 'Application updated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update application',
            };
        }
    }
    async deleteApp(appId, user) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can delete applications',
                    message: 'Unauthorized',
                };
            }
            const result = await this.appInfoService.deleteApp(appId);
            return {
                success: true,
                data: result,
                message: 'Application deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete application',
            };
        }
    }
    async getAppByPackageName(packageName) {
        try {
            const result = await this.appInfoService.getAppByPackageName(packageName);
            return {
                success: true,
                data: result,
                message: 'Application found',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Application not found',
            };
        }
    }
};
exports.AppInfoController = AppInfoController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "getAllApps", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':appId'),
    __param(0, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "getAppById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_dto_1.CreateAppDto, Object]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "createApp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':appId'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, app_dto_1.UpdateAppDto, Object]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "updateApp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':appId'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "deleteApp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('search/:packageName'),
    __param(0, (0, common_1.Param)('packageName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppInfoController.prototype, "getAppByPackageName", null);
exports.AppInfoController = AppInfoController = __decorate([
    (0, common_1.Controller)('apps'),
    __metadata("design:paramtypes", [app_info_service_1.AppInfoService])
], AppInfoController);
//# sourceMappingURL=app-info.controller.js.map