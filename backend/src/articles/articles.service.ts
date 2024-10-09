import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async create(articleDto: any): Promise<Article> {
    const newArticle = new this.articleModel(articleDto);
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
