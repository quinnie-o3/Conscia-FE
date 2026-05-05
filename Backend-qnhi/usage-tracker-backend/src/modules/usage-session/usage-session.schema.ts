import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsageSessionDocument = HydratedDocument<UsageSession>;

@Schema({ timestamps: true })
export class UsageSession {
  @Prop({ required: true, index: true })
  anonymousUserId: string;

  @Prop({ required: true, index: true })
  deviceId: string;

  @Prop({ required: true, index: true })
  packageName: string;

  @Prop()
  appName?: string;

  @Prop()
  purposeTag?: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true, min: 0 })
  durationSeconds: number;

  @Prop({ required: true, index: true })
  sessionDate: Date;

  @Prop({ required: true, unique: true, index: true })
  externalId: string;
}

export const UsageSessionSchema =
  SchemaFactory.createForClass(UsageSession);