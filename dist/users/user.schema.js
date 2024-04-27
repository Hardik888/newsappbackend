"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requrired: true,
    },
    bio: {
        type: String,
        requrired: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    subscriptionType: {
        typ: String,
    },
});
//# sourceMappingURL=user.schema.js.map