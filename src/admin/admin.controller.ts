import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { adminServices } from "./admin.services";

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

export const adminController={
    getAllAdminFromDB,
    getSingleAdminFromDB
}