import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppInfoService } from '../services/appinfo.service';
import { JwtGuard } from '../guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('apps')
export class AppInfoController {
  constructor(private appInfoService: AppInfoService) {}

  /**
   * POST /apps
   * Register a single app
   */
  @Post()
  async registerApp(
    @Body()
    body: {
      packageName: string;
      appName: string;
      appCategory?: string;
      iconUrl?: string;
      isSystemApp?: boolean;
    },
  ) {
    try {
      const result = await this.appInfoService.registerApp(body);
      return {
        success: true,
        data: result,
        message: 'App registered successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to register app',
      };
    }
  }

  /**
   * POST /apps/batch
   * Register multiple apps at once
   */
  @Post('batch')
  async registerApps(
    @Body()
    body: {
      apps: Array<{
        packageName: string;
        appName: string;
        appCategory?: string;
        iconUrl?: string;
        isSystemApp?: boolean;
      }>;
    },
  ) {
    try {
      const result = await this.appInfoService.registerApps(body.apps);
      return {
        success: true,
        data: result,
        message: `${result.length} app(s) registered successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to register apps',
      };
    }
  }

  /**
   * GET /apps/search?q=youtube
   * Search apps by name or package
   */
  @Get('search')
  async searchApps(@Query('q') query: string) {
    try {
      const result = await this.appInfoService.searchApps(query || '');
      return {
        success: true,
        data: result,
        message: 'Apps found',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to search apps',
      };
    }
  }

  /**
   * GET /apps/package/:packageName
   * Get app by package name
   */
  @Get('package/:packageName')
  async getAppByPackage(@Param('packageName') packageName: string) {
    try {
      const result = await this.appInfoService.getAppByPackageName(packageName);
      return {
        success: true,
        data: result,
        message: 'App retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get app',
      };
    }
  }

  /**
   * GET /apps/:appId
   * Get app by ID
   */
  @Get(':appId')
  async getAppById(@Param('appId') appId: string) {
    try {
      const result = await this.appInfoService.getAppById(appId);
      return {
        success: true,
        data: result,
        message: 'App retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to get app',
      };
    }
  }
}
