"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_info_schema_1 = require("../schemas/app-info.schema");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
let AppInfoService = class AppInfoService {
    appInfoModel;
    constructor(appInfoModel) {
        this.appInfoModel = appInfoModel;
    }
    async getAllApps(category) {
        if (category) {
            return await this.appInfoModel.find({ appCategory: category });
        }
        return await this.appInfoModel.find();
    }
    async getAppById(appId) {
        if (!appId) {
            throw new custom_exceptions_1.InvalidInputException('appId', 'App ID is required');
        }
        const app = await this.appInfoModel.findById(appId).exec();
        if (!app) {
            throw new custom_exceptions_1.AppNotFoundException(appId);
        }
        return app;
    }
    async getAppByPackageName(packageName) {
        const app = await this.appInfoModel.findOne({ packageName });
        if (!app) {
            throw new Error('Application not found');
        }
        return app;
    }
    async createApp(packageName, appName, category, iconReference) {
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
    async updateApp(appId, updateData) {
        const app = await this.appInfoModel.findByIdAndUpdate(appId, updateData, { new: true });
        if (!app) {
            throw new Error('Application not found');
        }
        return app;
    }
    async deleteApp(appId) {
        const app = await this.appInfoModel.findByIdAndDelete(appId).exec();
        if (!app) {
            throw new custom_exceptions_1.AppNotFoundException(appId);
        }
        return app;
    }
};
exports.AppInfoService = AppInfoService;
exports.AppInfoService = AppInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(app_info_schema_1.AppInfo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppInfoService);
//# sourceMappingURL=app-info.service.js.map