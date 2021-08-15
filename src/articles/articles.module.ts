import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { DbService } from '../db/db.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, DbService],
})
export class ArticlesModule {}
