import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PurposeTag extends Document {
  @Prop({ required: true, unique: true })
  tagName: string;

  @Prop()
  colorCode: string;

  @Prop()
  emoji: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isDefault: boolean;

  @Prop({ enum: ['PURPOSEFUL', 'DISTRACTING', 'NEUTRAL'], default: 'NEUTRAL' })
  category: string;
}

export const PurposeTagSchema = SchemaFactory.createForClass(PurposeTag);
