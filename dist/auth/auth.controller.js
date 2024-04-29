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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./guards/auth.guard");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async insertFirst(req, res) {
        try {
            const userdata = req.body;
            const newUser = await this.userService.insertFirst(userdata);
            if (newUser) {
                return res.status(common_1.HttpStatus.CREATED).json(newUser);
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send('Registration failed');
            }
        }
        catch (error) {
            console.error('Error from server', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Interal Server Error');
        }
    }
    async loginFirst(req, res) {
        try {
            const userdata = req.body;
            const newUser = await this.userService.loginfirst(userdata);
            if (!newUser) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send('ERROR LOGGIN IN ');
            }
            return res.status(common_1.HttpStatus.CREATED).json({ Userinfo: newUser });
        }
        catch (error) {
            console.error('Error from server ', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: 'Internal Server Error'
            });
        }
    }
    async checkguard(req, res) {
        try {
            const decodedToken = req.user;
            console.log({ decodedToken });
            return res.status(common_1.HttpStatus.OK).json({ message: 'Authentication successful' });
        }
        catch (error) {
            console.error('Error from server ', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "insertFirst", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginFirst", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, common_1.Get)('/check'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkguard", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map