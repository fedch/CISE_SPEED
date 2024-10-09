import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.entity'; // Adjust the path if necessary

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
}
