import { ReminderService } from '../services/reminder.service';
import { CreateReminderDto, UpdateReminderDto } from '../dtos/reminder.dto';
export declare class ReminderController {
    private reminderService;
    constructor(reminderService: ReminderService);
    createReminder(createReminderDto: CreateReminderDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getReminders(user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getActiveReminders(user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    getReminderById(reminderId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    updateReminder(reminderId: string, updateReminderDto: UpdateReminderDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    deleteReminder(reminderId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    deactivateReminder(reminderId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/reminder.schema").Reminder, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/reminder.schema").Reminder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
}
