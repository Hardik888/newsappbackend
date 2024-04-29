import { Injectable } from "@nestjs/common";
import { Article } from "./entities/article.entity";

import { ArticleProviderService } from "./entities/articleprovider.service";

@Injectable()
export class ArticleService {
  constructor(
    private articleService: ArticleProviderService
  ) { }

  async createArticle(articleInfo: Article): Promise<Article | any> {
    try {
      if (!articleInfo) {
        return null;
      }
      const { provider } = articleInfo
      if (provider) {
        //checkforexitingArticle{this checks whether user has already published an article}
        const checkforexitingArticle = await this.articleService.create(articleInfo)
        console.log(checkforexitingArticle)
        return checkforexitingArticle
      }
    } catch (error) {
      return error;
    }
  }
}
