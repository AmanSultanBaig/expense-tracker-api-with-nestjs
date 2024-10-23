import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ExpenseDocument = Expense & Document;

@Schema({ toObject: { getters: true, virtuals: false } })
export class Expense {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Source' })
  sourceId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, index: true })
  updatedAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

ExpenseSchema.pre<Expense>('save', function (next) {
  this.updatedAt = new Date();
  next();
});
