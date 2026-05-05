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
exports.ReminderController = void 0;
const common_1 = require("@nestjs/common");
const reminder_service_1 = require("../services/reminder.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const reminder_dto_1 = require("../dtos/reminder.dto");
let ReminderController = class ReminderController {
    reminderService;
    constructor(reminderService) {
        this.reminderService = reminderService;
    }
    async createReminder(createReminderDto, user) {
        try {
            const result = await this.reminderService.createReminder(user.userId, createReminderDto);
            return {
                success: true,
                data: result,
                message: 'Reminder created successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create reminder',
            };
        }
    }
    async getReminders(user) {
        try {
            const result = await this.reminderService.getRemindersByUserId(user.userId);
            return {
                success: true,
                data: result,
                message: 'Reminders retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get reminders',
            };
        }
    }
    async getActiveReminders(user) {
        try {
            const result = await this.reminderService.getActiveReminders(user.userId);
            return {
                success: true,
                data: result,
                message: 'Active reminders retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get active reminders',
            };
        }
    }
    async getReminderById(reminderId, user) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);
            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This reminder does not belong to you');
            }
            return {
                success: true,
                data: reminder,
                message: 'Reminder retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get reminder',
            };
        }
    }
    async updateReminder(reminderId, updateReminderDto, user) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);
            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This reminder does not belong to you');
            }
            const result = await this.reminderService.updateReminder(reminderId, updateReminderDto);
            return {
                success: true,
                data: result,
                message: 'Reminder updated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update reminder',
            };
        }
    }
    async deleteReminder(reminderId, user) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);
            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This reminder does not belong to you');
            }
            const result = await this.reminderService.deleteReminder(reminderId);
            return {
                success: true,
                data: result,
                message: 'Reminder deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete reminder',
            };
        }
    }
    async deactivateReminder(reminderId, user) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);
            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new common_1.UnauthorizedException('This reminder does not belong to you');
            }
            const result = await this.reminderService.deactivateReminder(reminderId);
            return {
                success: true,
                data: result,
                message: 'Reminder deactivated successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to deactivate reminder',
            };
        }
    }
};
exports.ReminderController = ReminderController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reminder_dto_1.CreateReminderDto, Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "createReminder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "getReminders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('active'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "getActiveReminders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':reminderId'),
    __param(0, (0, common_1.Param)('reminderId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "getReminderById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':reminderId'),
    __param(0, (0, common_1.Param)('reminderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reminder_dto_1.UpdateReminderDto, Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "updateReminder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':reminderId'),
    __param(0, (0, common_1.Param)('reminderId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "deleteReminder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':reminderId/deactivate'),
    __param(0, (0, common_1.Param)('reminderId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReminderController.prototype, "deactivateReminder", null);
exports.ReminderController = ReminderController = __decorate([
    (0, common_1.Controller)('reminders'),
    __metadata("design:paramtypes", [reminder_service_1.ReminderService])
], ReminderController);
//# sourceMappingURL=reminder.controller.js.map