import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleAnalysis, ArticleAnalysisDocument } from './schemas/article-analysis.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleAnalysisService {
  constructor(
    @InjectModel(ArticleAnalysis.name) private analysisModel: Model<ArticleAnalysisDocument>,
  ) {}

  async createAnalysis(
    articleId: string,
    title: string,
    author: string,
    publicationDate: string,
    DOI: string,
    abstract: string,
    uploadDate: string,
    link: string,
    practice: string,
    claim: string,
    result: string,
  ): Promise<ArticleAnalysis> {
    const newAnalysis = new this.analysisModel({ articleId, title, author, publicationDate, DOI, abstract, uploadDate, link, practice, claim, result });
    return newAnalysis.save();
  }

  async findAnalysesByArticleId(articleId: string): Promise<ArticleAnalysis[]> {
    return this.analysisModel.find({ articleId }).exec();
  }
}
