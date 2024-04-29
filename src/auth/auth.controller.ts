import { Controller, Req, Res, HttpStatus, Post, Get, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthenticationGuard } from "./guards/auth.guard";

@Controller('users')
export class AuthController {
    constructor(private readonly userService: AuthService) { }

    @Post()
    async insertFirst(@Req() req: Request, @Res() res: Response) {
        try {
            const userdata = req.body;
            const newUser = await this.userService.insertFirst(userdata);
            if (newUser) {
                return res.status(HttpStatus.CREATED).json(newUser);
            }
            else {
                return res.status(HttpStatus.BAD_REQUEST).send('Registration failed')
            }
        } catch (error) {
            console.error('Error from server', error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Interal Server Error');
        }
    }
    @Post('/login')
    async loginFirst(@Req() req: Request, @Res() res: Response) {
        try {
            const userdata = req.body;
            const newUser = await this.userService.loginfirst(userdata)
            if (!newUser) {
                return res.status(HttpStatus.BAD_REQUEST).send('ERROR LOGGIN IN ');
            }
            return res.status(HttpStatus.CREATED).json({ Userinfo: newUser })
        }
        catch (error) {
            console.error('Error from server ', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            })
        }
    }
    @UseGuards(AuthenticationGuard)
    @Get('/check')
    async checkguard(@Req() req: any, @Res() res: Response) {
        try {
            const decodedToken = req.user;
            console.log({ decodedToken }); // Log the decoded token

            return res.status(HttpStatus.OK).json({ message: 'Authentication successful' });
        } catch (error) {

            console.error('Error from server ', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
}