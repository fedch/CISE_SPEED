import { IsString, IsIn } from 'class-validator';

export class CreateAnalysisDto {
  @IsString()
  practice: string;

  @IsString()
  claim: string;

  @IsIn(['agree', 'disagree', 'neutral'])
  result: string;
}