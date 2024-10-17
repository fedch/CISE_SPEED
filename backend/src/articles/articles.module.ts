import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './article.entity';
import { ArticleAnalysis, ArticleAnalysisSchema } from './schemas/article-analysis.schema';
import { ArticleAnalysisService } from './article-analysis.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema },
      { name: ArticleAnalysis.name, schema: ArticleAnalysisSchema },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleAnalysisService],
})
export class ArticlesModule {}
