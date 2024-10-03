import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

describe('AuthService', () => {
    let service: AuthService;
    let userModel: Model<User>;
    let jwtService: JwtService;
  
    const mockUser = {
      username: 'nanipip554@sgatra.com',
      password: 'hashed_password',
      role: 'admin',
      _id: 'userId123',
    };
  
    const mockUserModel = {
      findOne: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
    };
  
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: getModelToken(User.name), useValue: mockUserModel },
          { provide: JwtService, useValue: mockJwtService },
        ],
      }).compile();
  
      service = module.get<AuthService>(AuthService);
      userModel = module.get<Model<User>>(getModelToken(User.name));
      jwtService = module.get<JwtService>(JwtService);
    });
  
    // Test for the signup method
    describe('signup', () => {
      it('should create a new user and return a success message', async () => {
        jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null); // No existing user
        const bcryptHashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
  
        const result = await service.signup('nanipip554@sgatra.com', 'password123');
  
        expect(bcryptHashSpy).toHaveBeenCalledWith('password123', 10);
        expect(userModel.create).toHaveBeenCalledWith({
          username: 'nanipip554@sgatra.com',
          password: 'hashed_password',
          role: 'admin',
        });
        expect(result).toEqual({
          message: 'Signup successful',
          user: mockUser,
        });
      });
    });
  
    // Test for the login method
    describe('login', () => {
      it('should return a JWT token and a success message if the credentials are valid', async () => {
        const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  
        const result = await service.login(mockUser);
  
        expect(jwtService.sign).toHaveBeenCalledWith({
          username: mockUser.username,
          sub: mockUser._id,
        });
        expect(result).toEqual({
          message: 'Login successful',
          access_token: 'mockJwtToken',
        });
      });
    });
  });
  