
import catchAsync from "../utily/catchAsync";
import { facultyServices } from "./faculty.services";
import sendResponse from "../utily/sendResponse";
import status from "http-status";

const getAllFacultyFromDB=catchAsync(async(req,res)=>{
    const result=await facultyServices.getAllFacultyFromDB()
    sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get all faculty data',
    data: result,
  })
})

const getSingleFacultyFromDB=catchAsync(async(req,res)=>{
    const id=req.params.id;
    const result=await facultyServices.getSingleFacultyFromDB(id)
     sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get specific faculty data',
    data: result,
  })
})

export const facultyController={
    getAllFacultyFromDB,
    getSingleFacultyFromDB
}