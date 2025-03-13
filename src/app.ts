
import express, { Application,  Request, Response } from 'express';
import cors from 'cors';
import { userRouters } from './user/user.router';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFounds from './middleware/notFound';


const app: Application = express();




app.use(express.json());
app.use(cors());

app.use('/api/v1/users/',userRouters)



app.get('/', (req: Request, res: Response) => {
  res.send('well come to my  ph university server');
});


app.use(globalErrorHandler)
app.use(notFounds)

export default app;