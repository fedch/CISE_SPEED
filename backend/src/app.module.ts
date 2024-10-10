import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './auth/admin.controller';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // Get DB_URI from config service
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    AuthModule,
    ArticlesModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}