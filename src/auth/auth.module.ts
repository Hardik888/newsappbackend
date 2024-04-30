import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserProvider } from '../users/entities/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthenticationGuard } from './guards/auth.guard';
import { forwardRef } from '@nestjs/common';
@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: 'secretkey',
            signOptions: { expiresIn: '6d' }
        }),

    ],
    controllers: [AuthController],
    providers: [AuthService, UserProvider, AuthenticationGuard],
    exports: [AuthenticationGuard, JwtModule]
})
export class AuthModule { }
