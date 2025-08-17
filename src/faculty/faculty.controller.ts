
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

export const facultyController={
    getAllFacultyFromDB
}