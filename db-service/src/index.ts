import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
//routes
import companyRoute from './routes/company';
import vacancyRoute from './routes/vacancy';
//
import connectDB from './config/db';

dotenv.config({ path: './src/config/.env' });

//  MongoDB connection
connectDB();

const app: Application = express();

// create application/json parser
const jsonParser = bodyParser.json();

const PORT = process.env.PORT;

app.use(cors());
app.use(jsonParser);
//  Routes
app.use(companyRoute);
app.use(vacancyRoute);

app.listen(PORT, () => {
  console.log(`db service runing on port ${PORT}`);
});
