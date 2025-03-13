/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";


const notFounds=(req:Request,res:Response,next:NextFunction):any=>{


    return res.status(status.NOT_FOUND).json({
        success:false,
        message:"API not found",
      
    })
}

export default notFounds