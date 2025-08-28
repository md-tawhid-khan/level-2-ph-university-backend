import status from 'http-status';
import catchAsync from '../utily/catchAsync';
import sendResponse from '../utily/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemesterController = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await academicSemesterServices.createAcademicSemesterIntoDB(data);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create academic semester successfully',
    data: result,
  });
});

const getAllAcademicSemesterFromDB=catchAsync(async(req,res)=>{
  const result=await academicSemesterServices.getAllAcademicSemesterFromDB(req.query)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get all academic semester successfully',
    meta:result.meta,
    data: result.result,
  });
})

const getSingleAcademicSemesterFromDB=catchAsync(async(req,res)=>{
  const id=req.params.semesterId;
  const result=await academicSemesterServices.getSingleAcademicSemesterFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get single academic semester successfully',
    data: result,
  });
})

const updateAcademicSemesterInformation=catchAsync(async(req,res)=>{
  const id= req.params.semesterId;
  const updateData= req.body ;
  const result=await academicSemesterServices.updateAcademicSemesterInformation(id,updateData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'updated academic semester successfully',
    data: result,
  });
})

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterInformation
};
