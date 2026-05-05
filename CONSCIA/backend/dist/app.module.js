"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_schema_1 = require("./schemas/user.schema");
const device_schema_1 = require("./schemas/device.schema");
const app_info_schema_1 = require("./schemas/app-info.schema");
const purpose_tag_schema_1 = require("./schemas/purpose-tag.schema");
const usage_session_schema_1 = require("./schemas/usage-session.schema");
const goal_schema_1 = require("./schemas/goal.schema");
const reminder_schema_1 = require("./schemas/reminder.schema");
const auth_service_1 = require("./services/auth.service");
const user_service_1 = require("./services/user.service");
const device_service_1 = require("./services/device.service");
const session_service_1 = require("./services/session.service");
const tag_service_1 = require("./services/tag.service");
const goal_service_1 = require("./services/goal.service");
const app_info_service_1 = require("./services/app-info.service");
const reminder_service_1 = require("./services/reminder.service");
const statistics_service_1 = require("./services/statistics.service");
const auth_controller_1 = require("./controllers/auth.controller");
const user_controller_1 = require("./controllers/user.controller");
const device_controller_1 = require("./controllers/device.controller");
const session_controller_1 = require("./controllers/session.controller");
const tag_controller_1 = require("./controllers/tag.controller");
const goal_controller_1 = require("./controllers/goal.controller");
const purpose_tag_controller_1 = require("./controllers/purpose-tag.controller");
const app_info_controller_1 = require("./controllers/app-info.controller");
const reminder_controller_1 = require("./controllers/reminder.controller");
const statistics_controller_1 = require("./controllers/statistics.controller");
const jwt_guard_1 = require("./guards/jwt.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: device_schema_1.Device.name, schema: device_schema_1.DeviceSchema },
                { name: app_info_schema_1.AppInfo.name, schema: app_info_schema_1.AppInfoSchema },
                { name: purpose_tag_schema_1.PurposeTag.name, schema: purpose_tag_schema_1.PurposeTagSchema },
                { name: usage_session_schema_1.UsageSession.name, schema: usage_session_schema_1.UsageSessionSchema },
                { name: goal_schema_1.Goal.name, schema: goal_schema_1.GoalSchema },
                { name: reminder_schema_1.Reminder.name, schema: reminder_schema_1.ReminderSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            user_controller_1.UserController,
            device_controller_1.DeviceController,
            session_controller_1.SessionController,
            tag_controller_1.TagController,
            goal_controller_1.GoalController,
            purpose_tag_controller_1.PurposeTagController,
            app_info_controller_1.AppInfoController,
            reminder_controller_1.ReminderController,
            statistics_controller_1.StatisticsController,
        ],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            device_service_1.DeviceService,
            session_service_1.SessionService,
            tag_service_1.TagService,
            goal_service_1.GoalService,
            app_info_service_1.AppInfoService,
            jwt_guard_1.JwtGuard,
            reminder_service_1.ReminderService,
            statistics_service_1.StatisticsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map