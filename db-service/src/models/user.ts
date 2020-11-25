import { MyUser } from './../types/user';
import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

export default model<MyUser>('User', userSchema);
