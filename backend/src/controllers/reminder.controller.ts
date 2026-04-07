import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { ReminderService } from '../services/reminder.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

@Controller('reminders')
export class ReminderController {
    constructor(private reminderService: ReminderService) { }

    @UseGuards(JwtGuard)
    @Post()
    async createReminder(
        @Body()
        body: {
            type: string;
            conditionValue: number;
            message: string;
        },
        @CurrentUser() user: any,
    ) {
        try {
            const result = await this.reminderService.createReminder(
                user.userId,
                body,
            );
            return {
                success: true,
                data: result,
                message: 'Reminder created successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to create reminder',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get()
    async getReminders(@CurrentUser() user: any) {
        try {
            const result = await this.reminderService.getRemindersByUserId(
                user.userId,
            );
            return {
                success: true,
                data: result,
                message: 'Reminders retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get reminders',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get('active')
    async getActiveReminders(@CurrentUser() user: any) {
        try {
            const result = await this.reminderService.getActiveReminders(
                user.userId,
            );
            return {
                success: true,
                data: result,
                message: 'Active reminders retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get active reminders',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Get(':reminderId')
    async getReminderById(
        @Param('reminderId') reminderId: string,
        @CurrentUser() user: any,
    ) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);

            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new UnauthorizedException(
                    'This reminder does not belong to you',
                );
            }

            return {
                success: true,
                data: reminder,
                message: 'Reminder retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get reminder',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Put(':reminderId')
    async updateReminder(
        @Param('reminderId') reminderId: string,
        @Body() body: any,
        @CurrentUser() user: any,
    ) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);

            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new UnauthorizedException(
                    'This reminder does not belong to you',
                );
            }

            const result = await this.reminderService.updateReminder(
                reminderId,
                body,
            );
            return {
                success: true,
                data: result,
                message: 'Reminder updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to update reminder',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':reminderId')
    async deleteReminder(
        @Param('reminderId') reminderId: string,
        @CurrentUser() user: any,
    ) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);

            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new UnauthorizedException(
                    'This reminder does not belong to you',
                );
            }

            const result = await this.reminderService.deleteReminder(reminderId);
            return {
                success: true,
                data: result,
                message: 'Reminder deleted successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to delete reminder',
            };
        }
    }

    @UseGuards(JwtGuard)
    @Put(':reminderId/deactivate')
    async deactivateReminder(
        @Param('reminderId') reminderId: string,
        @CurrentUser() user: any,
    ) {
        try {
            const reminder = await this.reminderService.getReminderById(reminderId);

            if (reminder.userId !== user.userId && user.role !== 'ADMIN') {
                throw new UnauthorizedException(
                    'This reminder does not belong to you',
                );
            }

            const result = await this.reminderService.deactivateReminder(reminderId);
            return {
                success: true,
                data: result,
                message: 'Reminder deactivated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to deactivate reminder',
            };
        }
    }
}