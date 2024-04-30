import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { AuthenticationGuard } from "src/auth/guards/auth.guard";
@Controller("users")
export class UserController {
    constructor(private userService: UserService) { }
    @UseGuards(AuthenticationGuard)
    @Post("profile")
    async updateUserProfile(@Req() req: Request, @Res() res: Response) {
        try {
            const userdata = req.body;
            const id = (req as any).user.sub;
            if (!id) {
                throw new UnauthorizedException({
                    message: "User does not exist",
                });
            }
            const updatedUser = await this.userService.updateProfile(id, userdata);
            console.log(updatedUser);
            // return {
            //     UserUpdated: userdata.username,
            // };

            return res.json({
                userupdated: userdata.username
            })
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }
}
