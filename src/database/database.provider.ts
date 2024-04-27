import * as mongoose from 'mongoose';

export const databaseProvider = {
  provide: "DB",
  useFactory: () => {
    const mongouri = process.env.MONGODB
    return mongoose.createConnection(mongouri);

  }
}