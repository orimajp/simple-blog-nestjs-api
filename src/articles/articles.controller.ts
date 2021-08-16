import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticle, UpdateArticle } from './articles.interface';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  async getArticleList() {
    return this.service.getArticleList();
  }

  @Get(':articleId')
  async getArticle(@Param('articleId') articleId: string) {
    const article = await this.service.getArticle(articleId);
    if (!article) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `記事が見つかりません。 articleId=${articleId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return article;
  }

  @Post()
  async postArticle(@Body() createArticle: CreateArticle) {
    const articleId = await this.service.postArticle(createArticle);
    return { articleId };
  }

  @Put(':articleId')
  async putArticle(
    @Param('articleId') articleId: string,
    @Body() updateArticle: UpdateArticle,
  ) {
    const article = await this.service.putArticle(articleId, updateArticle);
    if (!article) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `記事が見つかりません。 articleId=${articleId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return article;
  }

  @Delete(':articleId')
  @HttpCode(204)
  async deleteArticle(@Param('articleId') articleId: string) {
    return this.service.deleteArticle(articleId);
  }
}
