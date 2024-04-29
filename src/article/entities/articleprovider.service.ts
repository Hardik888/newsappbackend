import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Article } from "./article.entity";

@Injectable()
export class ArticleProviderService {
    constructor(
        @Inject('ARTICLE_MODEL')
        private articleModel: Model<Article>

    ) { }
    findOne(provider: string) {
        return this.articleModel.findOne({ provider }).exec();
    }
    create(obj: Pick<Article, "provider">) {
        return this.articleModel.create(obj);
    }
}