import { Request, Response } from "express";
import { UserService } from "./auth.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    insertFirst(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginFirst(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    checkguard(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
