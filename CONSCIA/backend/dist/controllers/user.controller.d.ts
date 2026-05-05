import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(userId: string): Promise<{
        success: boolean;
        data: {
            userId: import("mongoose").Types.ObjectId;
            email: string;
            fullName: string;
            avatarUrl: string;
            bio: string;
            role: string;
            isActive: boolean;
            createdAt: Date;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        data?: undefined;
    }>;
    updateUserProfile(userId: string, body: any): Promise<{
        success: boolean;
        data: {
            userId: import("mongoose").Types.ObjectId;
            email: string;
            fullName: string;
            avatarUrl: string;
            bio: string;
            updatedAt: Date;
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
