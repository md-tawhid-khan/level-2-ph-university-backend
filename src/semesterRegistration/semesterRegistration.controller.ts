import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.services";
import { Request, Response } from "express";

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

const getSingleSemesterRegistration=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.semesterRegistrationId
    const result=await SemesterRegistrationServices.getSingleSemesterRegistration(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get single semester registration successfully',
        data:result
    })
})

const updateSemesterRegistration=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.semesterRegistrationId
    const payload=req.body
    const result= await SemesterRegistrationServices.updateSemesterRegistration(id,payload)

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully updated semester registration',
        data:result
    })
})

export const semesterRegistrationController={
    createSemseterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}