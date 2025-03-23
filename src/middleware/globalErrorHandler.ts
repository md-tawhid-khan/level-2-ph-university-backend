/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, } from 'express';
import { ZodError,} from 'zod';
import config from '../app/config';
import { handleZodError } from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import { TErrorSources } from '../interface/error';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';




const globalErrorHandler:ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  //setting default values
 
  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';

  let errorSources:TErrorSources =[{
       path:'',
       message:'something went wrong'
  }]

  if(error instanceof ZodError){ 
      const simplifyError=handleZodError(error)
      statusCode=simplifyError?.statusCode ;
      message=simplifyError?.message ;
      errorSources = simplifyError?.errorSources;   
   }
   else if(error?.name === "ValidationError"){
   const simplifyError=handleValidationError(error)
   statusCode=simplifyError?.statusCode;
   message=simplifyError?.message ;
   errorSources=simplifyError?.errorSources ;
   }
   else if(error?.name === "CastError"){
    const simplifyError=handleCastError(error) 
    statusCode=simplifyError?.statusCode ;
    message = simplifyError?.message ;
    errorSources = simplifyError?.errorSources
  }
  else if(error?.code === 11000){
    const simplifyError=handleDuplicateError(error)
    statusCode=simplifyError?.statusCode ;
    message=simplifyError?.message ;
    errorSources=simplifyError?.errorSources
  }


//ultimate return 

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack:config.NODE_ENV==='development' ? error?.stack : null
  });

};

export default globalErrorHandler;
