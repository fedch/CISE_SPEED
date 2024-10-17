import { Date } from 'mongoose'

export class CreateArticleDto 
{
    title: string;
    author: string;
    publicationDate: string;
    DOI: string;
    abstract: string;
    uploadDate: string;
    link: string;
}