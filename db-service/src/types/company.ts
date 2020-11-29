import { Document } from 'mongoose';

export interface MyCompany extends Document {
  name: string;
  address: string;
}
