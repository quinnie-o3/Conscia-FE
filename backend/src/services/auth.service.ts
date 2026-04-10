import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../schemas/user.schema';
import {
  UserAlreadyExistsException,
  InvalidCredentialsException,
  InvalidTokenException,
  UserNotFoundException,
  InvalidInputException,
} from '../exceptions/custom.exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(email: string, fullName: string, password: string) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidInputException('email', 'Invalid email format');
    }

    // Validate fullName
    if (!fullName || fullName.trim().length < 2) {
      throw new InvalidInputException(
        'fullName',
        'Must be at least 2 characters',
      );
    }

    // Validate password strength
    if (password.length < 6) {
      throw new InvalidInputException(
        'password',
        'Must be at least 6 characters',
      );
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UserAlreadyExistsException(email);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userModel.create({
      email,
      fullName,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new InvalidCredentialsException();
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // Generate tokens
    const accessToken = this.jwtService.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role || 'USER',
      },
      { expiresIn: '1h' },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user._id.toString() },
      { expiresIn: '7d' },
    );

    return {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });

      if (!decoded.userId) {
        throw new InvalidTokenException();
      }

      // Find user
      const user = await this.userModel.findById(decoded.userId);
      if (!user) {
        throw new UserNotFoundException();
      }

      // Generate new access token
      const accessToken = this.jwtService.sign(
        {
          userId: user._id.toString(),
          email: user.email,
          role: user.role || 'USER',
        },
        { expiresIn: '1h' },
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw error;
      }
      throw new InvalidTokenException();
    }
  }
}