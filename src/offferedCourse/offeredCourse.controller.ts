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
// create get all offered course from DB 

const getAllOfferedCourseFromDB=catchAsync(async(req:Request,res:Response)=>{
  const result=await offeredCourseServices.getAllOfferedCourseFromDB()
  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'get all  offered course  successfully',
    data:result
  })
})

//create get single offered course controller

const getSingleOfferedCourseFromDB=catchAsync(async(req:Request,res:Response)=>{
  const id= req.params.id;
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id)
  sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:' get specific offered course  successfully',
    data:result
  })
})

// create update offered course controller 
const updateOfferedCourseController=catchAsync(async(req:Request,res:Response)=>{
 const id=req.params.id;
 const payload= req.body;
 const result=await offeredCourseServices.updateOfferCourseIntoDB(id,payload)
 sendResponse(res,{
  statusCode:status.OK,
  success:true,
  message: 'offered course updated successfully',
  data:result
 }) 
}) 

// delete specific offered course from DB
const deleteSpecificOfferedCourseFromDB=catchAsync(async(req:Request, res:Response)=>{
  const id=req.params.id
  const result =await offeredCourseServices.deleteSpecificOfferedCourseFromDB(id)
   sendResponse(res,{
  statusCode:status.OK,
  success:true,
  message: 'offered course deleted successfully',
  data:result
 }) 
})
export const offeredCourseController={
    createOfferedCourse,
    updateOfferedCourseController,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    deleteSpecificOfferedCourseFromDB
}