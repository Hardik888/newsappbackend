"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = void 0;
const user_schema_1 = require("./user.schema");
exports.UserProvider = {
    provide: 'USER_MODEL',
    useFactory: (connection) => connection.model('User', user_schema_1.userSchema),
    inject: ["DB"],
};
//# sourceMappingURL=user.provider.js.map