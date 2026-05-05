import { Model } from 'mongoose';
import { Reminder } from '../schemas/reminder.schema';
export declare class ReminderService {
    private reminderModel;
    constructor(reminderModel: Model<Reminder>);
    createReminder(userId: string, reminderData: any): Promise<import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getReminderById(reminderId: string): Promise<import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRemindersByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getActiveReminders(userId: string): Promise<(import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateReminder(reminderId: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteReminder(reminderId: string): Promise<import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deactivateReminder(reminderId: string): Promise<import("mongoose").Document<unknown, {}, Reminder, {}, import("mongoose").DefaultSchemaOptions> & Reminder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
