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
   * Generate Access Token (15 minutes)
   */
  private generateAccessToken(userId: string, email: string) {
    return this.jwtService.sign(
      { userId, email, type: 'access' },
      {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '15m',
      },
    );
  }

  /**
   * Generate Refresh Token (7 days)
   */
  private generateRefreshToken(userId: string, email: string) {
    return this.jwtService.sign(
      { userId, email, type: 'refresh' },
      {
        secret: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',
        expiresIn: '7d',
      },
    );
  }

  /**
   * Generate both tokens
   */
  generateTokens(userId: string, email: string) {
    const accessToken = this.generateAccessToken(userId, email);
    const refreshToken = this.generateRefreshToken(userId, email);

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }

  /**
   * Verify Refresh Token và issue new Access Token
   */
  refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key',
      });

      if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const accessToken = this.generateAccessToken(
        payload.userId,
        payload.email,
      );

      return {
        accessToken,
        expiresIn: 900,
      };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Register new user
   */
  async register(email: string, password: string, fullName: string) {
    try {
      // Check if user exists
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await this.userModel.create({
        email,
        passwordHash: hashedPassword,
        fullName,
        createdAt: new Date(),
      });

      // Generate tokens
      const tokens = this.generateTokens(newUser._id.toString(), email);

      return {
        user: {
          userId: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
        ...tokens,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Login user
   */
  async login(email: string, password: string) {
    try {
      // Find user
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate tokens
      const tokens = this.generateTokens(user._id.toString(), email);

      return {
        user: {
          userId: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        ...tokens,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}