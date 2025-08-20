
import status from "http-status";
import catchAsync from "../utily/catchAsync";
import sendResponse from "../utily/sendResponse";
import { authServices } from "./auth.services";
import config from "../app/config";

const loginUser=catchAsync(async(req,res)=>{
   
    const result=await authServices.loginUser(req.body)
    
    const { accessToken,refreshToken,needsPasswordChanges}=result;
    res.cookie('refreshToken',refreshToken,{
        secure:config.NODE_ENV === 'production',
        httpOnly:true
    })
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message: ' successfully create log in ',
        data:{accessToken,needsPasswordChanges}
    })
})
const changePassword=catchAsync(async(req,res)=>{
   const user=req?.user?.jwtPayload;
     
   const {...passwordData}=req.body ;
   
     const result=await authServices.changePassword(user,passwordData)

    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message: ' successfully create new password',
        data:null
    })
})

export const authController={
    loginUser,
    changePassword
}