import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import all schemas
import { User, UserSchema } from './schemas/user.schema';
import { Device, DeviceSchema } from './schemas/device.schema';
import { AppInfo, AppInfoSchema } from './schemas/app-info.schema';
import { PurposeTag, PurposeTagSchema } from './schemas/purpose-tag.schema';
import { UsageSession, UsageSessionSchema } from './schemas/usage-session.schema';
import { Goal, GoalSchema } from './schemas/goal.schema';

// Import all services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DeviceService } from './services/device.service';
import { SessionService } from './services/session.service';
import { TagService } from './services/tag.service';
import { GoalService } from './services/goal.service';

// Import all controllers
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { DeviceController } from './controllers/device.controller';
import { SessionController } from './controllers/session.controller';
import { TagController } from './controllers/tag.controller';
import { GoalController } from './controllers/goal.controller';

// Import guards
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    // Load environment variables from .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Connect to MongoDB
    MongooseModule.forRoot(process.env.MONGODB_URI as string),

    // Register all schemas
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Device.name, schema: DeviceSchema },
      { name: AppInfo.name, schema: AppInfoSchema },
      { name: PurposeTag.name, schema: PurposeTagSchema },
      { name: UsageSession.name, schema: UsageSessionSchema },
      { name: Goal.name, schema: GoalSchema },
    ]),

    // Setup JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    DeviceController,
    SessionController,
    TagController,
    GoalController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    DeviceService,
    SessionService,
    TagService,
    GoalService,
    JwtGuard,
  ],
})
export class AppModule { }