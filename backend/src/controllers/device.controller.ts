import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DeviceService } from '../services/device.service';
import { JwtGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  /**
   * POST /devices
   * Create new device
   */
  @Post()
  async createDevice(
    @CurrentUser('userId') currentUserId: string,
    @Body() body: { userId: string; deviceName: string; deviceType: string },
  ) {
    try {
      const result = await this.deviceService.createDevice(currentUserId, body);
      return {
        success: true,
        data: result,
        message: 'Device created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create device',
      };
    }
  }

  /**
   * GET /devices
   * Get all devices of the authenticated user
   */
  @Get()
  async getDevicesByUser(@CurrentUser('userId') userId: string) {
    try {
      const result = await this.deviceService.getDevicesByUserId(userId);
      return {
        success: true,
        data: result,
        message: 'Devices retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get devices',
      };
    }
  }

  /**
   * GET /devices/:deviceId
   * Get device by ID
   */
  @Get(':deviceId')
  async getDeviceById(@Param('deviceId') deviceId: string) {
    try {
      const result = await this.deviceService.getDeviceById(deviceId);
      return {
        success: true,
        data: result,
        message: 'Device retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get device',
      };
    }
  }

  /**
   * PUT /devices/:deviceId
   * Update device
   */
  @Put(':deviceId')
  async updateDevice(@Param('deviceId') deviceId: string, @Body() body: any) {
    try {
      const result = await this.deviceService.updateDevice(deviceId, body);
      return {
        success: true,
        data: result,
        message: 'Device updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update device',
      };
    }
  }

  /**
   * DELETE /devices/:deviceId
   * Delete device
   */
  @Delete(':deviceId')
  async deleteDevice(@Param('deviceId') deviceId: string) {
    try {
      const result = await this.deviceService.deleteDevice(deviceId);
      return {
        success: true,
        data: result,
        message: 'Device deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete device',
      };
    }
  }
}
