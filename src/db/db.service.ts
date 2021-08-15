import { Injectable } from '@nestjs/common';
import {
  Article,
  Articles,
  CreateArticle,
  UpdateArticle,
} from '../articles/articles.interface';
import { generate } from 'short-uuid';

const DUMMY_BODY = `# 見出し1
本文
> 引用

**強調**

## 見出し2

\`\`\`js
function test() {
  alert('test');
}
\`\`\`
`;

@Injectable()
export class DbService {
  private articles: Array<Article>;
  constructor() {
    this.articles = [
      {
        id: 'dummy',
        title: 'ダミータイトル',
        body: DUMMY_BODY,
      },
    ];
  }

  async getArticleList(): Promise<Articles> {
    return new Promise<Articles>((resolve) => {
      resolve({ articles: this.articles });
    });
  }

  async getArticle(articleId: string): Promise<Article | null> {
    return new Promise<Article | null>((resolve) => {
      const list = this.articles.filter((article) => article.id === articleId);
      if (list.length) {
        return resolve(list[0]);
      } else {
        return resolve(null);
      }
    });
  }

  async postArticle(article: CreateArticle): Promise<string> {
    return new Promise<string>((resolve) => {
      const id = generate();
      const newArticle: Article = {
        id,
        title: article.title,
        body: article.body,
      };
      this.articles.unshift(newArticle);
      resolve(id);
    });
  }

  async putArticle(
    articleId: string,
    article: UpdateArticle,
  ): Promise<Article | null> {
    return new Promise<Article | null>((resolve) => {
      const list = this.articles.filter((article) => article.id === articleId);
      if (list.length) {
        list[0].title = article.title;
        list[0].body = article.body;
        return resolve(list[0]);
      } else {
        return resolve(null);
      }
    });
  }

  async deleteArticle(articleId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.articles = this.articles.filter(
        (article) => article.id !== articleId,
      );
      resolve();
    });
  }
}
