import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    /**
     * Get user by ID
     */
    async getUserById(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt,
        };
    }

    /**
     * Update user profile
     */
    async updateProfile(userId: string, updateData: any) {
        const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
            new: true,
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            updatedAt: user.updatedAt,
        };
    }

    /**
     * Get user by email
     */
    async getUserByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
}