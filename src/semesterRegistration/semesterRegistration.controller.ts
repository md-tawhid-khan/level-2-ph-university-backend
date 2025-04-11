import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.services";

const createSemseterRegistration=catchAsync(async(req,res)=>{

    const result= await SemesterRegistrationServices.createSemseterRegistration(req.body)

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'semester registration is created successfully',
        data:result
    })
})


const getAllSemesterRegistration=catchAsync(async(req,res)=>{
    const result=await SemesterRegistrationServices.getAllSemesterRegistration(req.query)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:' semester registration retrived successfully',
        data:result
    })
})
export const semesterRegistrationController={
    createSemseterRegistration,
    getAllSemesterRegistration
}