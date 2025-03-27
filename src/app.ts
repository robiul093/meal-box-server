import cors from 'cors';
import express, { Request, Response } from 'express';
import { AuthRouter } from './app/modules/Auth/auth.routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { ProviderRouter } from './app/modules/MealProvider/provider.route';
import { CustomerRouter } from './app/modules/Customer/customer.route';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://meal-box-client.vercel.app",
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }),
);

app.use('/api', AuthRouter);
app.use('/api', ProviderRouter);
app.use('/api', CustomerRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Meal Box is running!');
});

app.use(notFound as any);

app.use(globalErrorHandler as any);

export default app;
