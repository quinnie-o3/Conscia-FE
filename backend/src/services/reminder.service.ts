import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder } from '../schemas/reminder.schema';

@Injectable()
export class ReminderService {
    constructor(
        @InjectModel(Reminder.name) private reminderModel: Model<Reminder>,
    ) { }

    async createReminder(userId: string, reminderData: any) {
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

    async getReminderById(reminderId: string) {
        const reminder = await this.reminderModel.findById(reminderId).exec();
        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }

    async getRemindersByUserId(userId: string) {
        const reminders = await this.reminderModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .exec();

        return reminders;
    }

    async getActiveReminders(userId: string) {
        const reminders = await this.reminderModel
            .find({ userId, isActive: true })
            .sort({ createdAt: -1 })
            .exec();

        return reminders;
    }

    async updateReminder(reminderId: string, updateData: any) {
        const reminder = await this.reminderModel
            .findByIdAndUpdate(reminderId, updateData, { new: true })
            .exec();

        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }

    async deleteReminder(reminderId: string) {
        const reminder = await this.reminderModel.findByIdAndDelete(reminderId).exec();
        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }

    async deactivateReminder(reminderId: string) {
        const reminder = await this.reminderModel
            .findByIdAndUpdate(reminderId, { isActive: false }, { new: true })
            .exec();

        if (!reminder) {
            throw new Error('Reminder not found');
        }
        return reminder;
    }
}