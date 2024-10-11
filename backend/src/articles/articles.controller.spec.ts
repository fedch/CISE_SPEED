import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

const mockArticle = {
  id: '1',  // 文章ID
  title: 'Test Article',
  author: 'John Doe',
  publicationDate: '2024-01-01',
  DOI: '10.1234/example.doi',
  abstract: 'This is a test article.',
  uploadDate: '2024-02-01',
  link: 'https://example.com/article1',
};

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockArticle]),
            findOne: jest.fn().mockResolvedValue(mockArticle),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should return all articles', async () => {
    const articles = await controller.findAll();
    expect(articles).toBeDefined();
  });

  it('should return one article by id', async () => {
    const article = await controller.findOne('1');  // 使用文章ID
    expect(article).toBeDefined();
  });
});
