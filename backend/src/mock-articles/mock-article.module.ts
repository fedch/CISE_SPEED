import { Module } from '@nestjs/common';
import { ArticleService } from './mock-article.service';
import { ArticleController } from './mock-article.controller';

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
