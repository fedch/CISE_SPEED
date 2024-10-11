import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({ required: true })  // 标题是必需字段
  title: string;

  @Prop()  // 作者可以是可选字段
  author: string;

  @Prop()  // 文章发布日期
  publicationDate: string;

  @Prop()  // DOI 文章的数字对象唯一标识符
  DOI: string;

  @Prop()  // 文章摘要
  abstract: string;

  @Prop()  // 上传日期
  uploadDate: string;

  @Prop()  // 链接到文章的 URL
  link: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
