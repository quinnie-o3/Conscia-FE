import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    /**
     * Register new user
     */
    async register(email: string, fullName: string, password: string) {
        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.userModel.create({
            email,
            fullName,
            passwordHash: hashedPassword,
            role: 'USER',
            isActive: true,
        });

        return {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            message: 'User registered successfully',
        };
    }

    /**
     * Login user
     */
    async login(email: string, password: string) {
        // Find user by email
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const accessToken = this.jwtService.sign(
            { userId: user._id, email: user.email },
            { expiresIn: '24h' },
        );

        const refreshToken = this.jwtService.sign(
            { userId: user._id },
            { expiresIn: '7d' },
        );

        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: 86400,
            user: {
                userId: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        };
    }

    /**
     * Validate JWT token
     */
    async validateToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken);
            const newAccessToken = this.jwtService.sign(
                { userId: decoded.userId },
                { expiresIn: '24h' },
            );

            return {
                accessToken: newAccessToken,
                tokenType: 'Bearer',
                expiresIn: 86400,
            };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}