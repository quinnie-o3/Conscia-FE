import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class UsageSession extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Device', required: true })
  deviceId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AppInfo' })
  appId: string;

  @Prop({ unique: true, sparse: true })
  externalId: string;

  @Prop()
  packageName: string;

  @Prop()
  appName: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  endedAt: Date;

  @Prop()
  durationSeconds: number;

  @Prop({ required: true })
  sessionDate: Date;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  isClassified: boolean;

  @Prop([
    {
      tagId: { type: MongooseSchema.Types.ObjectId, ref: 'PurposeTag' },
      tagName: String,
      note: String,
      classifiedAt: Date,
    },
  ])
  tags: Array<any>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UsageSessionSchema = SchemaFactory.createForClass(UsageSession);
