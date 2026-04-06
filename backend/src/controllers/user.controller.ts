import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * GET /users/:userId
   * Get user profile by ID
   */
  @Get(':userId')
  async getUserProfile(@Param('userId') userId: string) {
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
  async updateUserProfile(@Param('userId') userId: string, @Body() body: any) {
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
