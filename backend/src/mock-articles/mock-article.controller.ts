import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './mock-article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }
}
