export interface Articles {
  articles: Array<Article>;
}

export interface Article {
  id: string;
  title: string;
  body: string;
}

export interface CreateArticle {
  title: string;
  body: string;
}

export interface UpdateArticle {
  title: string;
  body: string;
}
