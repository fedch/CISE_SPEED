// Jest test for the admin controller

import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AuthService } from '../auth/auth.service';
import { NotFoundException } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  let authService: AuthService;

  const mockUser = {
    _id: '66fc74593f12e1c43464200f',
    username: 'new@email.com',
    role: 'user',
  };

  const mockAuthService = {
    findUserByEmail: jest.fn(),
    updateUserRole: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return the user when the email exists', async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(mockUser); // Mock user data

    const result = await controller.getUserByEmail(mockUser.username);
    expect(result).toEqual(mockUser); // Expect the returned user to match the mock data
    expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.username);
  });

  it('should throw NotFoundException when the user is not found', async () => {
    mockAuthService.findUserByEmail.mockResolvedValue(null); // Mock user not found

    await expect(controller.getUserByEmail('nonexistent@email.com')).rejects.toThrow(
      NotFoundException,
    );
    expect(authService.findUserByEmail).toHaveBeenCalledWith('nonexistent@email.com');
  });

  it('should update the user role', async () => {
    const updatedUser = { ...mockUser, role: 'Moderator' }; // Mock updated user data
    mockAuthService.updateUserRole.mockResolvedValue(updatedUser); // Mock role update

    const result = await controller.updateUserRole({
      email: mockUser.username,
      newRole: 'Moderator',
    });

    expect(result).toEqual(updatedUser); // Expect the updated user
    expect(authService.updateUserRole).toHaveBeenCalledWith(
      mockUser.username,
      'Moderator',
    );
  });
});
