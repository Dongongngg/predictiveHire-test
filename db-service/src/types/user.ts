import { Document } from 'mongoose';

export interface MyUser extends Document {
  name: string;
  username: string;
  password: string;
  company?: string;
  role: string;
}
