import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Model } from 'mongoose';

const mockArticle = {
  id: '1',
  title: 'Test Article',
  author: 'John Doe',
  publicationDate: '2024-01-01',
  DOI: '10.1234/example.doi',
  abstract: 'This is a test article.',
  uploadDate: '2024-02-01',
  link: 'https://example.com/article1',
};

describe('ArticlesService', () => {
  let service: ArticlesService;
  let model: Model<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name), // 模拟 Mongoose 模型
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockArticle]), // 模拟 find().exec()
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockArticle), // 模拟 findById().exec()
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    model = module.get<Model<Article>>(getModelToken(Article.name));
  });

  it('should return all articles', async () => {
    const articles = await service.findAll();
    expect(articles).toEqual([mockArticle]);
  });

  it('should return one article by id', async () => {
    const article = await service.findOne('1');
    expect(article).toEqual(mockArticle);
  });
});
