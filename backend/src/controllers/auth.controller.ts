import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(
        registerDto.email,
        registerDto.fullName,
        registerDto.password,
      );
      return {
        success: true,
        data: result,
        message: 'User registered successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to register user',
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password,
      );
      return {
        success: true,
        data: result,
        message: 'User logged in successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to login',
      };
    }
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result = await this.authService.refreshToken(
        refreshTokenDto.refreshToken,
      );
      return {
        success: true,
        data: result,
        message: 'Token refreshed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to refresh token',
      };
    }
  }
}
