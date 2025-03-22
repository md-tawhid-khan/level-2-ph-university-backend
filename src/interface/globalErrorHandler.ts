import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "./error";

export const handleZodError=(error:ZodError)=>{

    const  statusCode=400 ;
    const errorSources:TErrorSource =error.issues.map((issue:ZodIssue)=>{
      return{
       path:issue?.path[issue.path.length-1],
       message:issue.message ,
      }
    })

    return {
      statusCode,
      message:'validation error',
      errorSources,
      
    }

  }

  