import { Inject, Injectable } from "@nestjs/common";
import { Article } from "./entities/article.entity";
import { Model } from "mongoose";

@Injectable()
export class ArticleService {
  constructor(
    @Inject("ARTICLE_MODEL")
    private articleModel: Model<Article>
  ) { }

  async createArticle(articleInfo: Article): Promise<Article | any> {
    try {
      if (!articleInfo) {
        return null;
      }
      //checkforexitingArticle{this checks whether user has already published an article}

      
      
    } catch { }
  }
}
