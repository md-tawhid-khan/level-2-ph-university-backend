/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, } from 'express';
import { ZodError,} from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../app/config';
import { handleZodError } from '../interface/globalErrorHandler';



const globalErrorHandler:ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  //setting default values
 
  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';

  let errorSources:TErrorSource =[{
       path:'',
       message:'something went wrong'
  }]

  if(error instanceof ZodError){ 
      const simplifyError=handleZodError(error)
      statusCode=simplifyError?.statusCode ;
      message=simplifyError?.message ;
      errorSources = simplifyError?.errorSources;   
   }
   

//ultimate return 

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
    stack:config.NODE_ENV==='development' ? error?.stack : null
  });

};

export default globalErrorHandler;
