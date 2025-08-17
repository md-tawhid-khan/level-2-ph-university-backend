import { status } from 'http-status';
import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../utily/sendResponse';
import catchAsync from '../utily/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  // try {
  const { password, student: studentData } = req.body;

  

  const result = await userServices.createStudentIntoDB(password, studentData);
  // res.json({
  //    status:true,
  //    message:'successfully create user',
  //    data:result
  // })
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  });
  //    }
  //  catch (error) {
  //     // res.json({
  //     //     status:false,
  //     //     message:'something went wrong',
  //     //     error
  //     // })
  //     next(error)
  // }
});


const createFaculty:RequestHandler=catchAsync(async(req,res)=>{
  const {password,faculty:facultyData}=req.body;

  const result=await userServices.createFacultyIntoDB(password,facultyData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'faculty is retrived successfully',
    data: result,
  });
})
export const userController = {
  createStudent,
  createFaculty
};
