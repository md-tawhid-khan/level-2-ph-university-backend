import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { academicDepartmentService } from "./academicDepartment.serviec";

const createAcademicDepartment=catchAsync(async(req,res)=>{
    const payload=req.body;
    const result=await academicDepartmentService.createAcademicDepartment(payload)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"successfully created academic department",
        data:result
    })
})

const getAllAcademicDepartment=catchAsync(async(req,res)=>{
    const result=await academicDepartmentService.getAllAcademicDepartment()
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get all academic department data successfully",
        data:result
    })
})

const getSingleAcademicDepartment=catchAsync(async(req,res)=>{
    const id=req.params.departmentId ;
    const result=await academicDepartmentService.getSingleAcademicDepartment(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"get specific academic department data",
        data:result
    })
})

const updateAcademicDepartment=catchAsync(async(req,res)=>{
    const id=req.params.departmentId;
    const payload=req.body;
    const result=await academicDepartmentService.updateAcademicDepartment(id,payload)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"update academic department successfully",
        data:result
    })
})

export const academicDepartmentController={
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}