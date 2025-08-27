
import { status } from 'http-status';
import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../utily/sendResponse';
import catchAsync from '../utily/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
 
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(req.file,password, studentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  });
 
});

//-------------create Faculty -------------------

const createFaculty:RequestHandler=catchAsync(async(req,res)=>{
 
  const {password,faculty:facultyData}=req.body

  const result=await userServices.createFacultyIntoDB(req.file,password,facultyData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'faculty is retrived successfully',
    data: result,
  });
})

// -------------create admin with user ---------------------

const createAdmin:RequestHandler=catchAsync(async(req,res)=>{
  
  const {password,admin:adminData}=req.body;

  const result=await userServices.createAdminIntoDB(req.file,password,adminData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is retrived successfully',
    data: result,
  });
})

//----------------change status --------------------

const changeStatus:RequestHandler=catchAsync(async(req,res)=>{

  const id=req.params.id;
 const payload=req.body
 const  result= await userServices.changeStatus(id,payload)
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'userStatus is updated  successfully',
    data: result,
  });
})

// --------------- get single user by using token from DB -------
const getMe:RequestHandler=catchAsync(async(req,res)=>{
 
 const {userId,role}=req.user as JwtPayload;


  const result=await userServices.getMe(userId,role)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get me  is retrived successfully',
    data: result,
  });
})
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe

};
