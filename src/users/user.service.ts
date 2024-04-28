import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()

export class UserService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>
    ) { }

    create(obj: Pick<User, "username" | "password" | "email">) {
        return this.userModel.create(obj);
    }

    findOne(email: string) {
        return this.userModel.findOne({ email }).exec();
    }


}