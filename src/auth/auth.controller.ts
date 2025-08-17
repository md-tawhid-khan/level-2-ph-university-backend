import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { authServices } from "./auth.services";

const loginUser=catchAsync(async(req,res)=>{
    const result=await authServices.loginUser(req.body)
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message: ' successfully create log in ',
        data:result
    })
})

export const authController={
    loginUser
}