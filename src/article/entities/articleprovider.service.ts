import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Article } from "./article.entity";

@Injectable()
export class ArticleProviderService {
    constructor(
        @Inject('ARTICLE_MODEL')
        private articleModel: Model<Article>

    ) { }
    findOne(provider: String) {
        return this.articleModel.findOne({ provider }).exec();
    }
    create(payload: Article) {
        return this.articleModel.create(payload);
    }
}