import status from 'http-status';
import { studentService } from './student.service';
import sendResponse from '../utily/sendResponse';
import catchAsync from '../utily/catchAsync';
import { RequestHandler } from 'express';

const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  
  const result = await studentService.getAllStudent(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get all students data',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await studentService.getSingleStudent(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get single data successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const {student} = req.body;
  const result = await studentService.updateStudent(id, student); 
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'updated student data successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.studentId;

  const result = await studentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'deleted data successfully',
    data: result,
  });
});



export const studentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
