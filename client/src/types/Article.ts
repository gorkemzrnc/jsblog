export interface ArticleParams {
  _id: string;
  userId: string;
  title: string;
  content: string;
  thumbnailImage: string;
  category: string;
  comments: any[];
  createdAt: string;
  likes: any[];
}

export interface CreateArticleParams {
  title: string;
  content: string;
  thumbnailImage: string;
  category: string[];
}

export interface GetArticlesResponse {
  results: ArticleParams[];
}