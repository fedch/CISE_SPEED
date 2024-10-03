// This file handles authentication routes with the help of the AuthService.
// It defines two routes: /auth/login and /auth/signup.
// The login route validates user credentials and returns a JWT token.
// The signup route creates a new user account.


import { Controller, Get, Post, Body, Query, Param, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Handle login
  @Post('login') // POST /auth/login
  async login(@Body() body: any) {
    // Validate user credentials using AuthService
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    // If validation succeeds, call AuthService to generate and return a JWT token
    return this.authService.login(user);
  }

  // Handle signup
  @Post('signup') // POST /auth/signup
  async signup(@Body() body: any) {
    // Pass the username and password to AuthService to create a new user
    return this.authService.signup(body.username, body.password);
  }
}

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
    return user;  // Return user object with role
  }

  // Get list of users with specific roles
  @Get('moderators-analysts')
  async getModeratorsAndAnalysts() {
    return this.authService.getUsersByRoles(['Moderator', 'Analyst']);
  }

  // Update user role
  @Post('user/role')
  async updateUserRole(@Body() { email, newRole }: { email: string; newRole: string }) {
    return this.authService.updateUserRole(email, newRole);
  }
}
