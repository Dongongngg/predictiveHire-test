import { MyCompany } from './../types/company';
import { model, Schema } from 'mongoose';

const Company: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default model<MyCompany>('Company', Company);
