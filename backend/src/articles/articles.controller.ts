import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  
  @Post()
  async create(@Body() articleDto: any): Promise<Article> {
    return this.articlesService.create(articleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
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
