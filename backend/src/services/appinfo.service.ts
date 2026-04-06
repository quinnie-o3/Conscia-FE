import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppInfo } from '../schemas/app-info.schema';

@Injectable()
export class AppInfoService {
  constructor(
    @InjectModel(AppInfo.name) private appInfoModel: Model<AppInfo>,
  ) {}

  /**
   * Register or update an app by packageName
   */
  async registerApp(appData: {
    packageName: string;
    appName: string;
    appCategory?: string;
    iconUrl?: string;
    isSystemApp?: boolean;
  }) {
    const existing = await this.appInfoModel.findOne({
      packageName: appData.packageName,
    });

    if (existing) {
      const updated = await this.appInfoModel.findByIdAndUpdate(
        existing._id,
        appData,
        { new: true },
      );
      return {
        appId: updated!._id,
        packageName: updated!.packageName,
        appName: updated!.appName,
        appCategory: updated!.appCategory,
        iconUrl: updated!.iconUrl,
        isSystemApp: updated!.isSystemApp,
      };
    }

    const app = await this.appInfoModel.create(appData);
    return {
      appId: app._id,
      packageName: app.packageName,
      appName: app.appName,
      appCategory: app.appCategory,
      iconUrl: app.iconUrl,
      isSystemApp: app.isSystemApp,
    };
  }

  /**
   * Register multiple apps at once (batch)
   */
  async registerApps(
    appsData: Array<{
      packageName: string;
      appName: string;
      appCategory?: string;
      iconUrl?: string;
      isSystemApp?: boolean;
    }>,
  ) {
    const results = await Promise.all(
      appsData.map((app) => this.registerApp(app)),
    );
    return results;
  }

  /**
   * Get app by package name
   */
  async getAppByPackageName(packageName: string) {
    const app = await this.appInfoModel.findOne({ packageName });
    if (!app) {
      throw new Error('App not found');
    }
    return {
      appId: app._id,
      packageName: app.packageName,
      appName: app.appName,
      appCategory: app.appCategory,
      iconUrl: app.iconUrl,
      isSystemApp: app.isSystemApp,
    };
  }

  /**
   * Get app by ID
   */
  async getAppById(appId: string) {
    const app = await this.appInfoModel.findById(appId);
    if (!app) {
      throw new Error('App not found');
    }
    return {
      appId: app._id,
      packageName: app.packageName,
      appName: app.appName,
      appCategory: app.appCategory,
      iconUrl: app.iconUrl,
      isSystemApp: app.isSystemApp,
    };
  }

  /**
   * Search apps by name or package
   */
  async searchApps(query: string) {
    // Escape special regex characters to prevent ReDoS
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const apps = await this.appInfoModel
      .find({
        $or: [
          { appName: { $regex: escapedQuery, $options: 'i' } },
          { packageName: { $regex: escapedQuery, $options: 'i' } },
        ],
      })
      .limit(20);

    return apps.map((a) => ({
      appId: a._id,
      packageName: a.packageName,
      appName: a.appName,
      appCategory: a.appCategory,
      iconUrl: a.iconUrl,
    }));
  }
}
