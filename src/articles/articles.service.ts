import { Injectable } from '@nestjs/common';
import {
  Article,
  Articles,
  CreateArticle,
  UpdateArticle,
} from './articles.interface';
import { DbService } from '../db/db.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly service: DbService) {}

  async getArticleList(): Promise<Articles> {
    return this.service.getArticleList();
  }

  async getArticle(articleId: string): Promise<Article | null> {
    console.log(`記事取得 articleId:${articleId}`);
    return this.service.getArticle(articleId);
  }

  async postArticle(article: CreateArticle): Promise<string> {
    console.log('記事追加');
    console.log(article);
    return this.service.postArticle(article);
  }

  async putArticle(
    articleId: string,
    article: UpdateArticle,
  ): Promise<Article> {
    console.log(`記事更新 articleId=${articleId}`);
    console.log(article);
    return this.service.putArticle(articleId, article);
  }

  async deleteArticle(articleId: string): Promise<void> {
    console.log(`記事削除 articleId=${articleId}`);
    return this.service.deleteArticle(articleId);
  }
}
