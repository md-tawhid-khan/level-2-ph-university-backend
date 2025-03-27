import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { courseService } from "./course.service";

const createCourseIntoDB=catchAsync(async(req,res)=>{
    const payload=req.body;
    const result=await courseService.createCourseIntoDB(payload)
   sendResponse(res,{
    statusCode:status.OK,
    success:true,
    message:'successfully create course data',
    data:result
   })
})

const getAllCourseFromDB=catchAsync(async(req,res)=>{
    const query=req.query
    const result=await courseService.getAllCourseFromDB(query)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully retrieved course data',
        data:result
    })
})

const getSingleCourseFromDB=catchAsync(async(req,res)=>{
    const id=req.params.courseId ;
    const result=await courseService.getSingleCourseFromDB(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully retrieved single course data',
        data:result
    })
})

const updateCourseIntoDB=catchAsync(async(req,res)=>{
    const id=req.params.courseId ;
    const payload=req.body ;
    const result = await courseService.updateCourseIntoDB(id,payload)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully updated course data',
        data:result
    })
})

const deleteSingleCourseFromDB=catchAsync(async(req,res)=>{
    const id=req.params.courseId ;
    const result=await courseService.deleteSingleCourseFromDB(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully delete course data',
        data:result
    })
})

export const  courseController={
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteSingleCourseFromDB
}