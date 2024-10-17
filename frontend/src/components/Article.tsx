export type Article = {
    title?: string;
    author?: string;
    publicationDate?: string;
    DOI?: string;
    abstract?: string;
    uploadDate?: string;
    link?: string;
}

export const defaultEmptyArticle: Article =
{
    title: '',
    author: '',
    publicationDate: '',
    DOI: '',
    abstract: '',
    uploadDate: '',
    link: '',
}