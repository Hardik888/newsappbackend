import { Connection } from 'mongoose';
import { userSchema } from './user.schema';

export const UserProvider = {
  provide: 'USER_MODEL',
  useFactory: (connection: Connection) =>
    connection.model('User', userSchema),
  inject: ["DB"],
};