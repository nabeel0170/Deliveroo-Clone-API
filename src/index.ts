import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import restaurantRoutes from './routes/restaurantRoutes';
import userRoutes from './routes/userRoutes';
import { authroizeRequest } from './middleware/auth';
import cors from 'cors';
import { connectToDatabase } from './database/dbConnection';

const app = express();
const port = 8000;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.1.6:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'api-key'],
  }),
);

app.use(authroizeRequest);
app.use(express.json());

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
connectToDatabase();
