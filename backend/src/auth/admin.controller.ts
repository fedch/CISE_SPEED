// This file defines an AdminController class that handles admin routes.

import { Controller, Get, Post, Body, Query, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  // Get user by email
  @Get('user')
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.authService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get list of all users
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  // Update user role
  @Post('user/role')
  async updateUserRole(
    @Body() { email, newRole }: { email: string; newRole: string }
  ) {
    const updatedUser = await this.authService.updateUserRole(email, newRole);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
}
