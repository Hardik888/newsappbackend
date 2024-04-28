import { Module } from '@nestjs/common';
import { UserProvider } from './entities/user.provider';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [UserProvider, UserService]

})
export class UserModule { }
