import { Controller, Get, Post, Body, Param, Delete, NotFoundException, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './article-submit.dto';
import { Article } from './article.entity';
import { Types } from 'mongoose';

import { ArticleAnalysisService } from './article-analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis-dto';



@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly analysisService: ArticleAnalysisService,
    ) {}
  
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

  @Get('all-analyses')
  async getAnalysedArticles() {
    return this.analysisService.findAnalysedArticles();  // Directly return all analyses
  
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.articlesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id); 
  }


  
  // Add analysis to an article
  @Post(':id/analysis')
  @UsePipes(new ValidationPipe())
  async addAnalysis(
    @Param('id') id: string,
    @Body() createAnalysisDto: CreateAnalysisDto,
  ) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return this.analysisService.createAnalysis(
      id,
      createAnalysisDto.title,
      createAnalysisDto.author,
      createAnalysisDto.publicationDate,
      createAnalysisDto.DOI,
      createAnalysisDto.abstract,
      createAnalysisDto.uploadDate,
      createAnalysisDto.link,
      createAnalysisDto.practice,
      createAnalysisDto.claim,
      createAnalysisDto.result,
    );
  }

  // Get analyses for an article
  @Get(':id/analysis')
  async getAnalyses(@Param('id') id: string) {
    return this.analysisService.findAnalysesByArticleId(id);
  }
}
