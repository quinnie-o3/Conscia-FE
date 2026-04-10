import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    Query,
} from '@nestjs/common';
import { AppInfoService } from '../services/app-info.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { CreateAppDto, UpdateAppDto } from '../dtos/app.dto';

@Controller('apps')
export class AppInfoController {
    constructor(private appInfoService: AppInfoService) { }

    @UseGuards(JwtGuard)
    @Get()
    async getAllApps(@Query('category') category?: string) {
        try {
            const result = await this.appInfoService.getAllApps(category);
            return {
                success: true,
                data: result,
                message: 'Applications retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get applications',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get(':appId')
    async getAppById(@Param('appId') appId: string) {
        try {
            const result = await this.appInfoService.getAppById(appId);
            return {
                success: true,
                data: result,
                message: 'Application retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get application',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Post()
    async createApp(
        @Body() createAppDto: CreateAppDto,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can create applications',
                    message: 'Unauthorized',
                };
            }

            const result = await this.appInfoService.createApp(
                createAppDto.packageName,
                createAppDto.appName,
                createAppDto.category,
                createAppDto.iconReference,
            );
            return {
                success: true,
                data: result,
                message: 'Application created successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create application',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Put(':appId')
    async updateApp(
        @Param('appId') appId: string,
        @Body() updateAppDto: UpdateAppDto,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can update applications',
                    message: 'Unauthorized',
                };
            }

            const result = await this.appInfoService.updateApp(appId, updateAppDto);
            return {
                success: true,
                data: result,
                message: 'Application updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update application',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':appId')
    async deleteApp(
        @Param('appId') appId: string,
        @CurrentUser() user: any,
    ) {
        try {
            if (user.role !== 'ADMIN') {
                return {
                    success: false,
                    error: 'Only admins can delete applications',
                    message: 'Unauthorized',
                };
            }

            const result = await this.appInfoService.deleteApp(appId);
            return {
                success: true,
                data: result,
                message: 'Application deleted successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete application',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get('search/:packageName')
    async getAppByPackageName(@Param('packageName') packageName: string) {
        try {
            const result = await this.appInfoService.getAppByPackageName(
                packageName,
            );
            return {
                success: true,
                data: result,
                message: 'Application found',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Application not found',
            };
        }
    }
}