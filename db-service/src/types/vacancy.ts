import { Document } from 'mongoose';

export interface MyVacancy extends Document {
  title: string;
  description: string;
  expiredAt: Date;
}
