import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Reminder extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    conditionValue: number;

    @Prop()
    message: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);