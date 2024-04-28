import { Request, Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly userService;
    constructor(userService: AuthService);
    insertFirst(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    loginFirst(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    checkguard(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
