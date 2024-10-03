/**
 * This code defines the User schema, representing the structure of the user data stored in MongoDB.
 * It uses Mongoose with NestJS to define how the user documents will be stored in the database.
 * Currently, we store the username, password, and role fields for each user (default - user).
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' }) // Explicitly set the collection name
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
