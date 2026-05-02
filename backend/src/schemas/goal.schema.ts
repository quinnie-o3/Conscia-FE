import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Goal extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  goalName: string;

  @Prop({ required: true })
  goalType: string;

  @Prop({ required: true })
  targetValue: number;

  @Prop({ default: 'MINUTES' })
  targetUnit: string;

  @Prop({ default: 'DAILY' })
  periodType: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AppInfo' })
  appId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'PurposeTag' })
  tagId: string;

  @Prop({ default: 0 })
  currentProgress: number;

  @Prop({ default: 'ACTIVE' })
  status: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
