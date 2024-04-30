import { Module, forwardRef } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { ArticleProvider } from "./entities/article.provider";
import { ArticleProviderService } from "./entities/articleprovider.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        AuthModule
    ],
    controllers: [ArticleController],
    providers: [ArticleProvider, ArticleService, ArticleProviderService],
})

export class ArticleModule { }