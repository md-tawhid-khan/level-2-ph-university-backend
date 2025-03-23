import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFounds from './middleware/notFound';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application route

app.use('/api/v1', router);

const test=async(req,res)=>{

  const a=10;
  const b=12 ;
  res.send(`total value : ${a+b}`)
}


app.get('/', test) 

app.use(globalErrorHandler);
app.use(notFounds);

export default app;
