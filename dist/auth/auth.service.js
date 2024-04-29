"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
let AuthService = class AuthService {
    constructor(authservice, configService, jwtservice) {
        this.authservice = authservice;
        this.configService = configService;
        this.jwtservice = jwtservice;
    }
    async insertFirst(userdata) {
        try {
            const encodedpParams = new URLSearchParams();
            encodedpParams.set("email", userdata.email);
            const options = {
                method: "POST",
                url: this.configService.get("APIURL"),
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key": this.configService.get("APIKEY"),
                    "X-RapidAPI-Host": this.configService.get("APIHOST"),
                },
                data: encodedpParams,
            };
            const response = await axios_1.default.request(options);
            const data = await response.data;
            console.log("the data is", data);
            if (!data.mx_records && !data.valid) {
                return null;
            }
            const hashedPassword = await argon2.hash(userdata.password);
            userdata.password = hashedPassword;
            const newUser = await this.authservice.create(userdata);
            const saveduser = await newUser.save();
            return saveduser;
        }
        catch (error) {
            console.error("Error saving", error.message);
            console.log(this.configService.get("APIKEY"));
            return null;
        }
    }
    async loginfirst(userdata) {
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
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map