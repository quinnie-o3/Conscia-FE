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
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reminder_schema_1 = require("../schemas/reminder.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let ReminderService = class ReminderService {
    reminderModel;
    constructor(reminderModel) {
        this.reminderModel = reminderModel;
    }
    async createReminder(userId, reminderData) {
        const { type, conditionValue, message } = reminderData;
        const newReminder = await this.reminderModel.create({
            userId,
            type,
            conditionValue,
            message,
            isActive: true,
            createdAt: new Date(),
        });
        return newReminder;
    }
    async getReminderById(reminderId) {
        if (!reminderId) {
            throw new custom_exceptions_1.InvalidInputException('reminderId', 'Reminder ID is required');
        }
        const reminder = await this.reminderModel.findById(reminderId).exec();
        if (!reminder) {
            throw new custom_exceptions_1.ReminderNotFoundException(reminderId);
        }
        return reminder;
    }
    async getRemindersByUserId(userId) {
        const reminders = await this.reminderModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .exec();
        return reminders;
    }
    async getActiveReminders(userId) {
        const reminders = await this.reminderModel
            .find({ userId, isActive: true })
            .sort({ createdAt: -1 })
            .exec();
        return reminders;
    }
    async updateReminder(reminderId, updateData) {
        const reminder = await this.reminderModel
            .findByIdAndUpdate(reminderId, updateData, { new: true })
            .exec();
        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }
    async deleteReminder(reminderId) {
        const reminder = await this.reminderModel
            .findByIdAndDelete(reminderId)
            .exec();
        if (!reminder) {
            throw new custom_exceptions_1.ReminderNotFoundException(reminderId);
        }
        return reminder;
    }
    async deactivateReminder(reminderId) {
        const reminder = await this.reminderModel
            .findByIdAndUpdate(reminderId, { isActive: false }, { new: true })
            .exec();
        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }
};
exports.ReminderService = ReminderService;
exports.ReminderService = ReminderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reminder_schema_1.Reminder.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map