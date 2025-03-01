import cors from 'cors';
import express, { Request, Response } from 'express';
import { AuthRouter } from './app/modules/Auth/auth.routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors());


app.use('/api', AuthRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('Meal Box is running!');
});


app.use(globalErrorHandler);

app.use(notFound)


export default app;
