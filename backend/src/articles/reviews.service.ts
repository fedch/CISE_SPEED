// reviews.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  // 获取指定文章的所有评论
  async getReviewsForArticle(articleId: string): Promise<Review[]> {
    return this.reviewModel.find({ articleId }).sort({ createdAt: -1 }).exec();
  }

  // 添加评论
  async addReview(articleId: string, review: string, rating: number): Promise<Review> {
    const newReview = new this.reviewModel({ articleId, review, rating });
    return newReview.save();
  }
}
