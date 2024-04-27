import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { UserProvider } from '../users/user.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretkey',
            signOptions: { expiresIn: '60s' }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, UserProvider],
})
export class AuthModule { }
