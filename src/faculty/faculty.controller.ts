
import catchAsync from "../utily/catchAsync";
import { facultyServices } from "./faculty.services";
import sendResponse from "../utily/sendResponse";
import status from "http-status";
import { RequestHandler } from "express";

const getAllFacultyFromDB=catchAsync(async(req,res)=>{

    const result=await facultyServices.getAllFacultyFromDB(req.query)
    sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get all faculty data',
    meta:result.meta,
    data: result.result,
  })
})

const getSingleFacultyFromDB=catchAsync(async(req,res)=>{
    const id=req.params.id;
    const result=await facultyServices.getSingleFacultyFromDB(id)
     sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get specific faculty data',
    data: result,
  })
})

//---------------------- update faculty information ----------- 

const updateFacultyIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const {faculty} = req.body;
  const result = await facultyServices.updateFacultyIntoDB(id,faculty); 
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'updated faculty data successfully',
    data: result,
  });
});

//--------------- delete admin from DB ----------

const deleteFacultyIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.facultyId;

  const result = await facultyServices.deleteFacultyIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'deleted faculty data successfully',
    data: result,
  });
});


export const facultyController={
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyIntoDB
}