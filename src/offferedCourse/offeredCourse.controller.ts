import { Request, Response } from "express";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import status from "http-status";
import { offeredCourseServices } from "./offeredCourse.services";

const createOfferedCourse=catchAsync(async(req:Request,res:Response)=>{
  const result=await offeredCourseServices.createOfferedCourseIntoDB(req.body)
  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'offered course is created successfully',
    data:result
  })
})
export const offeredCourseController={
    createOfferedCourse
}