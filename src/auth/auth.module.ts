import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserProvider } from '../users/entities/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretkey',
            signOptions: { expiresIn: '60s' }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserProvider],
})
export class AuthModule { }
