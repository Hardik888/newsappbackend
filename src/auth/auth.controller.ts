import { Controller, Req, Res, HttpStatus, Post, Get, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./auth.service";
import { AuthenticationGuard } from "./guards/auth.guard";
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) { }

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
            if (newUser) {
                return res.status(HttpStatus.CREATED).json(`lOGGEDIN ${newUser}`)
            }
            return res.status(HttpStatus.BAD_REQUEST).send('ERROR LOGGIN IN ');
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
    async checkguard(@Req() req: any, @Res() res: Response) { // Use 'any' type for req
        try {
            const decodedToken = req.user; // Access decoded token without type checking
            console.log({ decodedToken }); // Log the decoded token
            // Your logic after successful authentication
            return res.status(HttpStatus.OK).json({ message: 'Authentication successful' });
        } catch (error) {
            // Handle errors
            console.error('Error from server ', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
}