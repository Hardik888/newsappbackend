import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
export declare class AuthService {
    private authservice;
    private readonly configService;
    private jwtservice;
    constructor(authservice: UserService, configService: ConfigService, jwtservice: JwtService);
    insertFirst(userdata: {
        email: string;
        username: string;
        password: string;
    }): Promise<any>;
    loginfirst(userdata: {
        email: string;
        password: string;
    }): Promise<any | null>;
}
