import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/user.service";
@Injectable()
export class AuthService {
    constructor(
        private authservice: UserService,
        private readonly configService: ConfigService,
        private jwtservice: JwtService
    ) { }

    async insertFirst(userdata: {
        email: string;
        username: string;
        password: string;
    }): Promise<any> {
        try {
            const encodedpParams = new URLSearchParams();
            encodedpParams.set("email", userdata.email);
            const options = {
                method: "POST",
                url: this.configService.get<string>("APIURL"),
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key": this.configService.get<string>("APIKEY"),
                    "X-RapidAPI-Host": this.configService.get<string>("APIHOST"),
                },
                data: encodedpParams,
            };
            const response = await axios.request(options);
            const data = await response.data;
            console.log("the data is", data);
            if (data.mx_records && data.valid) {


                const hashedPassword = await argon2.hash(userdata.password);
                userdata.password = hashedPassword;
                const newUser = await this.authservice.create(userdata);

                const saveduser = await newUser.save();
                return saveduser;
            }
            return null;
        } catch (error) {
            console.error("Error saving", error.message);
            console.log(this.configService.get<string>("APIKEY"));
            return null;
        }
    }

    async loginfirst(userdata: {
        email: string;
        password: string;
    }): Promise<any | null> {
        try {
            const { password, email } = userdata;
            const findUser = await this.authservice.findOne(email);

            const isPasswordvalid = await argon2.verify(findUser.password, password);
            if (!isPasswordvalid) {
                return null;
            }
            const payload = {
                username: findUser.username,
                sub: findUser._id,
                authType: "login",
            };
            const access_token = this.jwtservice.sign(payload);
            return {
                UserEmail: findUser.email,
                token: access_token,
            };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
