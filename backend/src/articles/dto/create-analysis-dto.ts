import { IsString, IsIn } from 'class-validator';

export class CreateAnalysisDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  publicationDate: string;

  @IsString()
  DOI: string;

  @IsString()
  abstract: string;

  @IsString()
  uploadDate: string;

  @IsString()
  link: string;
  
  @IsString()
  practice: string;

  @IsString()
  claim: string;

  @IsIn(['agree', 'disagree', 'neutral'])
  result: string;
}