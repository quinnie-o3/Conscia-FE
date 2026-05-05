import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppInfo extends Document {
  @Prop({ required: true, unique: true })
  packageName: string;

  @Prop({ required: true })
  appName: string;

  @Prop()
  appCategory: string;

  @Prop()
  iconUrl: string;

  @Prop({ default: false })
  isSystemApp: boolean;
}

export const AppInfoSchema = SchemaFactory.createForClass(AppInfo);
