/**
 * The AuthModule handles all authentication-related functionality in the application.
 * It uses Mongoose for database interaction, JWT for token-based authentication,
 * and Passport for authentication strategies. The module imports necessary services,
 * sets up schemas, and registers the JWT configuration dynamically using environment variables.
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthController], // Register AuthController
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy
  exports: [AuthService], // Export AuthService so other modules can use it
})
export class AuthModule {}
