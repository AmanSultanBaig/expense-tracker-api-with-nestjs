import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toObject: { getters: true, virtuals: false } })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string; 
  
  @Prop({ default: false })
  isSuperUser: boolean; 

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, index: true })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
