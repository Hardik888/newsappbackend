"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const mongoose = require("mongoose");
exports.databaseProvider = {
    provide: "DB",
    useFactory: () => {
        const mongouri = process.env.MONGODB;
        return mongoose.createConnection(mongouri);
    }
};
//# sourceMappingURL=database.provider.js.map