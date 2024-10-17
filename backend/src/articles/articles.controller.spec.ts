import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleAnalysisService } from './article-analysis.service';
import { Types } from 'mongoose';
import { CreateAnalysisDto } from './dto/create-analysis-dto';
import { NotFoundException } from '@nestjs/common';

// Use a valid MongoDB ObjectId for testing
const mockObjectId = new Types.ObjectId().toHexString();

const mockArticle = {
  id: mockObjectId,
  title: 'Test Article',
  author: 'John Doe',
  publicationDate: '2024-01-01',
  DOI: '10.1234/example.doi',
  abstract: 'This is a test article.',
  uploadDate: '2024-02-01',
  link: 'https://example.com/article1',
};

const mockCreateAnalysisDto: CreateAnalysisDto = {
  title: 'Test Article',
  author: 'John Doe',
  publicationDate: '2024-01-01',
  DOI: '10.1234/example.doi',
  abstract: 'This is a test article.',
  uploadDate: '2024-02-01',
  link: 'https://doi.org/10.1234/example.doi',
  practice: 'Best Practice',
  claim: 'Test Claim',
  result: 'agree',
};

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let articlesService: ArticlesService;
  let analysisService: ArticleAnalysisService;

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
        {
          provide: ArticleAnalysisService,  // Mock the ArticleAnalysisService
          useValue: {
            createAnalysis: jest.fn().mockResolvedValue(mockCreateAnalysisDto),
            findAnalysesByArticleId: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    articlesService = module.get<ArticlesService>(ArticlesService);
    analysisService = module.get<ArticleAnalysisService>(ArticleAnalysisService);
  });

  // Existing test cases
  it('should return all articles', async () => {
    const articles = await controller.findAll();
    expect(articles).toBeDefined();
    expect(articles).toEqual([mockArticle]);
  });

  it('should return one article by id', async () => {
    const article = await controller.findOne(mockObjectId); 
    expect(article).toBeDefined();
    expect(article).toEqual(mockArticle);
  });

  // New test case for `addAnalysis`
  it('should create a new analysis successfully', async () => {
    const result = await controller.addAnalysis(mockObjectId, mockCreateAnalysisDto);

    expect(articlesService.findOne).toHaveBeenCalledWith(mockObjectId);
    expect(analysisService.createAnalysis).toHaveBeenCalledWith(
      mockObjectId,
      mockCreateAnalysisDto.title,
      mockCreateAnalysisDto.author,
      mockCreateAnalysisDto.publicationDate,
      mockCreateAnalysisDto.DOI,
      mockCreateAnalysisDto.abstract,
      mockCreateAnalysisDto.uploadDate,
      mockCreateAnalysisDto.link,
      mockCreateAnalysisDto.practice,
      mockCreateAnalysisDto.claim,
      mockCreateAnalysisDto.result,
    );
    expect(result).toEqual(mockCreateAnalysisDto);
  });

  it('should throw NotFoundException if the article does not exist', async () => {
    jest.spyOn(articlesService, 'findOne').mockResolvedValue(null);

    await expect(controller.addAnalysis(mockObjectId, mockCreateAnalysisDto)).rejects.toThrow(NotFoundException);
  });
});
