import { Module, forwardRef } from "@nestjs/common";
import { UserProvider } from "./entities/user.provider";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./user.controller";

@Module({
  imports: [AuthModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserProvider, UserService],
})
export class UserModule { }
