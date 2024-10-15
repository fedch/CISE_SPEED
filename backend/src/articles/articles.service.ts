import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './article-submit.dto';
import { Article } from './article.entity'; // Adjust the path if necessary

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async create(createArticleDto: CreateArticleDto) 
  {
    const newArticle = new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  // 删除文章
  async delete(id: string): Promise<Article> {
    return this.articleModel.findByIdAndDelete(id).exec(); // 根据 ID 删除文章
  }
}
