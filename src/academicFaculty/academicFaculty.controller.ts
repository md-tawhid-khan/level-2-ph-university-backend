import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFacultyIntoDB=catchAsync(async(req,res)=>{
    const data=req.body;
    const result=await academicFacultyServices.createAcademicFacultyIntoDB(data)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'successfully create academic faculty',
        data:result
    })
})

const getAllAcademicFacultyFromDB=catchAsync(async(req,res)=>{
    const result=await academicFacultyServices.getAllAcademicFacultyFromDB()
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get all academic faculty data from DB',
        data:result
    })
})

const getSingleAcademicFacultyFromDB=catchAsync(async(req,res)=>{
    const id=req.params.facultyId;
    const result=await academicFacultyServices.getSingleAcademicFacultyFromDB(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get specific academic faculty data from DB',
        data:result
    })
})

const updateAcademicFacultyIntoDB=catchAsync(async(req,res)=>{
    const id=req.params.facultyId;
    const data=req.body
    const result=await academicFacultyServices.updateAcademicFacultyIntoDB(id,data)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'update academic faculty successfully',
        data:result
    })
})

export const academicFacultyController={
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}