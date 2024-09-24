/**
 * This code defines the User schema, representing the structure of the user data stored in MongoDB.
 * It uses Mongoose with NestJS to define how the user documents will be stored in the database.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
