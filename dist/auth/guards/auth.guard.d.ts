import { ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
declare const AuthenticationGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthenticationGuard extends AuthenticationGuard_base {
    private readonly jwtservice;
    constructor(jwtservice: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
export {};
