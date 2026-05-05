import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUserById(userId: string): Promise<{
        userId: import("mongoose").Types.ObjectId;
        email: string;
        fullName: string;
        avatarUrl: string;
        bio: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    updateProfile(userId: string, updateData: any): Promise<{
        userId: import("mongoose").Types.ObjectId;
        email: string;
        fullName: string;
        avatarUrl: string;
        bio: string;
        updatedAt: Date;
    }>;
    getUserByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
