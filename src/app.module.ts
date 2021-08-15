import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ArticlesModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
