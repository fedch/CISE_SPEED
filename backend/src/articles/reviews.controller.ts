// reviews.controller.ts
import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ArticlesService } from './articles.service';  // 确保正确导入
import { Review } from './schemas/review.schema';

@Controller('api/articles')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly articlesService: ArticlesService,
  ) {}

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string): Promise<Review[]> {
    const article = await this.articlesService.findOne(id);
    if (!article) throw new NotFoundException('Article not found');
    return this.reviewsService.getReviewsForArticle(id);
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id') id: string,
    @Body() body: { review: string; rating: number },
  ): Promise<Review> {
    // 先检查该文章是否存在
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // 添加评论
    return this.reviewsService.addReview(id, body.review, body.rating);
  }
}
