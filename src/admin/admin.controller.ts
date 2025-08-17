import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { adminServices } from "./admin.services";
import { RequestHandler } from "express";

const getAllAdminFromDB=catchAsync(async(req,res)=>{

    const result=await adminServices.getAllAdminFromDB()
     sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get all admin data',
    data: result,
  })

})
const getSingleAdminFromDB=catchAsync(async(req,res)=>{
   const id=req.params.id
    const result=await adminServices.getSingleAdminFromDB(id)
     sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get specific Admin data',
    data: result,
  })

})

//------------- update admin data
const updateAdminIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.adminId;
  const {admin} = req.body;
  const result = await adminServices.updateAdminIntoDB(id, admin); 
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'updated admin data successfully',
    data: result,
  });
});

export const adminController={
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB
}