// reviews.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ArticlesModule } from './articles.module';  // 导入 ArticlesModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),  // 注册 ReviewSchema
    ArticlesModule,  // 导入 ArticlesModule 以便 ReviewsModule 能访问 ArticlesService
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
