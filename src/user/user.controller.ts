
import { status } from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../utily/sendResponse";


const catchAsync=(fn:RequestHandler)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch(error=>next(error))
    }
}


const createStudent:RequestHandler=catchAsync(async(req,res,next)=>{
    // try {
        const {password,student:studentData}=req.body;

        const result=await userServices.createStudentIntoDB(password,studentData)
        // res.json({
        //    status:true,
        //    message:'successfully create user',
        //    data:result
        // })
        sendResponse(res,{
            statusCode:status.OK,
            success:true,
            message:'Student is retrived successfully',
            data:result
        })
//    }
    //  catch (error) {
    //     // res.json({
    //     //     status:false,
    //     //     message:'something went wrong',
    //     //     error
    //     // })
    //     next(error)
    // }
})

export const  userController={
    createStudent
}