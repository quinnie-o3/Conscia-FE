import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(email: string, fullName: string, password: string): Promise<{
        userId: import("mongoose").Types.ObjectId;
        email: string;
        fullName: string;
    }>;
    login(email: string, password: string): Promise<{
        userId: import("mongoose").Types.ObjectId;
        email: string;
        fullName: string;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
