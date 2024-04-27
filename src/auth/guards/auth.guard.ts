import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtservice: JwtService) {
        super()
    }
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        try {
            // console.log({ token })
            const decodedtoken = this.jwtservice.verify(token.split(' ')?.[1], {
                secret: 'secretkey'
            });
            console.log({ decodedtoken })
            request.user = decodedtoken;
            return true;
        }
        catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}