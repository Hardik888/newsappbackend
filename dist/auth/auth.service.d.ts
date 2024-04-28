import { User } from './auth.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
export declare class AuthService {
    private authservice;
    private readonly configService;
    private jwtservice;
    constructor(authservice: UserService, configService: ConfigService, jwtservice: JwtService);
    insertFirst(userdata: User): Promise<User | null>;
    loginfirst(userdata: User): Promise<any | null>;
}
