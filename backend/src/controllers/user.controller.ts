import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * GET /users/:userId
   * Get user profile by ID
   */
  @Get(':userId')
  async getUserProfile(
    @Param('userId') userId: string,
    @CurrentUser('userId') currentUserId: string,
  ) {
    if (userId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }
    try {
      const result = await this.userService.getUserById(userId);
      return {
        success: true,
        data: result,
        message: 'User profile retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get user profile',
      };
    }
  }

  /**
   * PUT /users/:userId
   * Update user profile
   */
  @Put(':userId')
  async updateUserProfile(
    @Param('userId') userId: string,
    @CurrentUser('userId') currentUserId: string,
    @Body() body: any,
  ) {
    if (userId !== currentUserId) {
      throw new ForbiddenException('Access denied');
    }
    try {
      const result = await this.userService.updateProfile(userId, body);
      return {
        success: true,
        data: result,
        message: 'User profile updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update user profile',
      };
    }
  }
}
