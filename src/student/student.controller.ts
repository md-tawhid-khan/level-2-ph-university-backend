import status from "http-status"
import { studentService } from "./student.service"
import sendResponse from "../utily/sendResponse"
import catchAsync from "../utily/catchAsync"

const getAllStudent=catchAsync(async(req,res)=>{
    const result=await studentService.getAllStudent()
    sendResponse(res,{
      statusCode:status.OK,
      success:true,
      message:'successfully get all students data',
      data:result
    })
  })

  const getSingleStudent=catchAsync(async(req,res)=>{
    const id=req.params.studentId;
    const result=await studentService.getSingleStudent(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'get single data successfully',
        data:result
    })
  })

  const updateStudent = catchAsync(async(req,res)=>{
    const id=req.params.studentId;
    const data=req.body;
    const result=await studentService.updateStudent(id,data)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'updated student data successfully',
        data:result
    })
  })

  const deleteStudent=catchAsync(async(req,res)=>{
    const id=req.params.studentId;
    const result=await studentService.deleteStudent(id)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:'deleted data successfully',
        data:result
    })
  })

  export const studentController={
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
  }