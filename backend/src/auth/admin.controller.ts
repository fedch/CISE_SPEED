// This file defines an AdminController class that handles admin routes.

import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('admin') // Route prefix is 'admin'
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  // GET /admin/user?email=email
  @Get('user')
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.authService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user; // This returns the user object
  }

  // GET /admin/users
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers(); // Fetch all users from the service
  }
}
