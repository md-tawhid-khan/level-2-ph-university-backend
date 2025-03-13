import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouters } from './user/user.router';


const app: Application = express();




app.use(express.json());
app.use(cors());

app.use('/api/v1/users/',userRouters)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;