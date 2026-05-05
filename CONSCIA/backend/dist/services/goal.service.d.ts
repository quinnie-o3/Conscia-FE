import { Model } from 'mongoose';
import { Goal } from '../schemas/goal.schema';
export declare class GoalService {
    private goalModel;
    constructor(goalModel: Model<Goal>);
    createGoal(userId: string, goalData: any): Promise<import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getGoalById(goalId: string): Promise<import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getGoalsByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getActiveGoals(userId: string): Promise<(import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateGoal(goalId: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteGoal(goalId: string): Promise<import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deactivateGoal(goalId: string): Promise<import("mongoose").Document<unknown, {}, Goal, {}, import("mongoose").DefaultSchemaOptions> & Goal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
