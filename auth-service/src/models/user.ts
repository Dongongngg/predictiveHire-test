import { MyUser } from './../types/user';
import { model, Schema } from 'mongoose';

const User: Schema = new Schema({
  companyId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
});

export default model<MyUser>('User', User);
