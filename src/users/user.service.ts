import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_MODEL")
    private userModel: Model<User>
  ) { }

  create(obj: Pick<User, "username" | "password" | "email">) {
    return this.userModel.create(obj);
  }

  findOne(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  updateProfile(id: string, obj: Partial<User>) {
    const validFields = ["username", "bio", "profilePicture"];
    const isValidBody = Object.keys(obj).every((key) =>
      validFields.includes(key)
    );
    // console.log("this the ",isValidBody);
    if (!isValidBody) throw new HttpException("Invalid payload", 401);
    return this.userModel
      .findOneAndUpdate({ _id: id }, obj, { new: true })
      .exec();
  }
}
// User.findOneAndUpdate({ username: username }, req.body, { new: true, upsert: true }, (err, updatedUser) => { /* Handle error and response */ });
