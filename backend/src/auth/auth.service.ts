/**
 * AuthService provides the core authentication logic, including user validation,
 * login, and signup functionality. It interacts with the User schema to manage
 * users in the database and with JwtService to handle JWT token generation.
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  // Validate the user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Handle user login and return JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Handle user signup
  async signup(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Set the admin role for a specific user
    const role = username === 'nanipip554@sgatra.com' ? 'admin' : 'user';
    const newUser = await this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });
    return newUser;    
  }
}
