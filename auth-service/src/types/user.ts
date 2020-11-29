import { Document } from 'mongoose';

export interface MyUser extends Document {
  companyId: string;
  name: string;
  username: string;
  password: string;
  roles: string[];
}
