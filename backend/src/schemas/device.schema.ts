import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Device extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    deviceName: string;

    @Prop({ default: 'ANDROID' })
    deviceType: string;

    @Prop()
    osVersion: string;

    @Prop()
    deviceModel: string;

    @Prop({ unique: true, sparse: true })
    androidId: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    lastSyncAt: Date;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);