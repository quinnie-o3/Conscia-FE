import { GoalService } from '../services/goal.service';
import { CreateGoalDto, UpdateGoalDto } from '../dtos/goal.dto';
export declare class GoalController {
    private goalService;
    constructor(goalService: GoalService);
    createGoal(createGoalDto: CreateGoalDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    getGoals(user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    getActiveGoals(user: any): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    getGoalById(goalId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    updateGoal(goalId: string, updateGoalDto: UpdateGoalDto, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    deleteGoal(goalId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
    deactivateGoal(goalId: string, user: any): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/goal.schema").Goal, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/goal.schema").Goal & Required<{
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
