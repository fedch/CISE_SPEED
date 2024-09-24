// This file handles authentication routes with the help of the AuthService.
// It defines two routes: /auth/login and /auth/signup.
// The login route validates user credentials and returns a JWT token.
// The signup route creates a new user account.


import { Controller, Post, Body } from '@nestjs/common';
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
