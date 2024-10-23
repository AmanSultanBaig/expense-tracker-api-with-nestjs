import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SourceDocument = Source & Document;

@Schema({ timestamps: true })
export class Source {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
