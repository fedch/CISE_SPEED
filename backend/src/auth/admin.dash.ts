// This code defines the AdminDashController, which is a controller that handles routes related to the admin dashboard.

import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('admin') // Define the base route for this controller
@UseGuards(RolesGuard) // Apply guard for all methods in this controller
export class AdminDashController {
  @Roles('admin')
  @Get('dashboard') // Now the route will be /admin/dashboard
  getAdminDashboard() {
    return { message: 'Admin dashboard' };
  }
}
