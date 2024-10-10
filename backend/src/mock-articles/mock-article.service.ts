import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArticleService {
  private readonly mockFilePath = path.join(__dirname, '../../mock-articles.json');

  // Read the mock articles from the file
  getArticles(): any[] {
    try {
      const data = fs.readFileSync(this.mockFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading mock articles file:', error);
      return [];
    }
  }
}
