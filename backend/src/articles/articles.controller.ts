import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './article-submit.dto';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto)
  {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll()
  {
    return this.articlesService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  // 添加删除文章的 API
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id); // 调用服务层的删除方法
  }
}
