import { Injectable, Param } from "@nestjs/common";
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
        //todo checkforexitingArticle{this checks whether user has already published an article}
        // maximum limit of 5 articles per free users
        // maybe implement a subscription model
        // const checkforexitingArticle = await 
        // console.log(checkforexitingArticle)
        return this.articleService.create(articleInfo)
      }
    } catch (error) {
      return error;
    }
  }
  async updateArticle(payload: any) {

    try {
      const { id } = payload
      if (!id) {
        return null;
      }
      return this.articleService.update(id, payload);
    }
    catch (error) {
      throw new error;
    }
  }

}
