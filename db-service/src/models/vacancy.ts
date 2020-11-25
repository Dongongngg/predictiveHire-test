import { MyVacancy } from './../types/vacancy';
import { model, Schema } from 'mongoose';

const Vacancy: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

export default model<MyVacancy>('Vacancy', Vacancy);
