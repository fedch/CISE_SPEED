import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleAnalysisDocument = ArticleAnalysis & Document;

@Schema()
export class ArticleAnalysis {
  @Prop({ required: true })
  articleId: string;

  @Prop({ required: true }) 
  title: string;

  @Prop() 
  author: string;

  @Prop() 
  publicationDate: string;

  @Prop() 
  DOI: string;

  @Prop()  
  abstract: string;

  @Prop()
  uploadDate: string;

  @Prop()  
  link: string;

  @Prop({ required: true })
  practice: string;

  @Prop({ required: true })
  claim: string;

  @Prop({ required: true, enum: ['agree', 'disagree', 'neutral'] })
  result: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ArticleAnalysisSchema = SchemaFactory.createForClass(ArticleAnalysis);
