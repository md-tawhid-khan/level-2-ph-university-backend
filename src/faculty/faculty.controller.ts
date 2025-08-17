
// import { Request, Response } from "express";
// import catchAsync from "../utily/catchAsync";
// import { facultyServices } from "./faculty.services";
// import sendResponse from "../utily/sendResponse";
// import status from "http-status";

// const createFacultyIntoDB=catchAsync(async(req:Request,res:Response)=>{
//  const result=await facultyServices.createFacultyIntoDB(req.body)
//  sendResponse(res,{
//     statusCode:status.OK,
//     success:true,
//     message:'offered course is created successfully',
//     data:result
//   })
// })
// export const facultyController={
//     createFacultyIntoDB
// }