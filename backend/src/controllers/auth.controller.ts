import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * POST /auth/register
     * Register new user
     */
    @Post('register')
    async register(
        @Body() body: { email: string; fullName: string; password: string },
    ) {
        try {
            const result = await this.authService.register(
                body.email,
                body.fullName,
                body.password,
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
                message: 'Registration failed',
            };
        }
    }

    /**
     * POST /auth/login
     * Login user
     */
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        try {
            const result = await this.authService.login(body.email, body.password);
            return {
                success: true,
                data: result,
                message: 'Login successful',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Login failed',
            };
        }
    }

    /**
     * POST /auth/refresh-token
     * Refresh access token
     */
    @Post('refresh-token')
    async refreshToken(@Body() body: { refreshToken: string }) {
        try {
            const result = await this.authService.refreshToken(body.refreshToken);
            return {
                success: true,
                data: result,
                message: 'Token refreshed successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Token refresh failed',
            };
        }
    }
}