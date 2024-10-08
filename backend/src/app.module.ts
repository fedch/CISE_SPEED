import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 确保导入 ConfigService
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 配置全局使用
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // 使用 ConfigService 获取环境变量
      }),
      inject: [ConfigService], // 注入 ConfigService
    }),
    ArticlesModule,
  ],
})
export class AppModule {}
