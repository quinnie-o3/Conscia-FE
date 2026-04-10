import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppInfo } from '../schemas/app-info.schema';
import {
  AppNotFoundException,
  InvalidInputException,
} from '../exceptions/custom.exceptions';

@Injectable()
export class AppInfoService {
  constructor(
    @InjectModel(AppInfo.name) private appInfoModel: Model<AppInfo>,
  ) { }

  async getAllApps(category?: string) {
    if (category) {
      return await this.appInfoModel.find({ appCategory: category });
    }
    return await this.appInfoModel.find();
  }

  async getAppById(appId: string) {
    if (!appId) {
      throw new InvalidInputException('appId', 'App ID is required');
    }

    const app = await this.appInfoModel.findById(appId).exec();
    if (!app) {
      throw new AppNotFoundException(appId);
    }
    return app;
  }

  async getAppByPackageName(packageName: string) {
    const app = await this.appInfoModel.findOne({ packageName });
    if (!app) {
      throw new Error('Application not found');
    }
    return app;
  }

  async createApp(
    packageName: string,
    appName: string,
    category: string,
    iconReference?: string,
  ) {
    const existing = await this.appInfoModel.findOne({ packageName });
    if (existing) {
      throw new Error('Application already exists');
    }

    const newApp = await this.appInfoModel.create({
      packageName,
      appName,
      appCategory: category,
      iconUrl: iconReference || '',
    });

    return newApp;
  }

  async updateApp(appId: string, updateData: any) {
    const app = await this.appInfoModel.findByIdAndUpdate(
      appId,
      updateData,
      { new: true },
    );
    if (!app) {
      throw new Error('Application not found');
    }
    return app;
  }

  async deleteApp(appId: string) {
    const app = await this.appInfoModel.findByIdAndDelete(appId).exec();
    if (!app) {
      throw new AppNotFoundException(appId);
    }
    return app;
  }
}