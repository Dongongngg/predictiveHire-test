import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//routes
import userRoute from './routes/user';
import companyRoute from './routes/company';
import vacancyRoute from './routes/vacancy';
//
import connectDB from './config/db';

dotenv.config({ path: './src/config/.env' });

//  MongoDB connection
connectDB();

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
//  Routes
app.use(userRoute);
app.use(companyRoute);
app.use(vacancyRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('db service running');
});

app.listen(PORT, () => console.log(`db service runing on port ${PORT}`));
