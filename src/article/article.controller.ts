; import { Controller, HttpStatus, Post, Get, UseGuards, Body, HttpException, Req, Res } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { Article } from "./entities/article.entity";
import { Request, Response } from "express";
import { AuthenticationGuard } from "src/auth/guards/auth.guard";

@Controller('article')
export class ArticleController {
    constructor(
        private articleService: ArticleService
    ) { }
    @UseGuards(AuthenticationGuard)
    @Post('create')

    async createArticle(@Req() req: Request, @Res() res: Response) {
        try {
            const provider = req.body
            if (!provider) {
                throw new HttpException('Missing required provider data', HttpStatus.BAD_REQUEST);
            }
            const create = await this.articleService.createArticle(provider)
            console.log(create)
            return res.status(HttpStatus.CREATED).json(create)
        } catch (error) {
            console.log(error)
            throw new HttpException('Internal server error', HttpStatus.BAD_GATEWAY)
        }

    }
}