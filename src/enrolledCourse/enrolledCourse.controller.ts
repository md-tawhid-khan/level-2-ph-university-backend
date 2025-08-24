import status from "http-status"
import catchAsync from "../utily/catchAsync"
import sendResponse from "../utily/sendResponse"
import { enrolledCourseServices } from "./enrolledCourse.services"

const createEnrolledCourseIntoDB=catchAsync(async(req,res)=>{

  // console.log(req.user)
  // console.log(req.body)
  const {userId}=req.user

    const result=await enrolledCourseServices.createEnrolledCourseIntoDB(userId,req.body)

     sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'enrolled course is  successful',
    data: result, 
    
  })
   })
export const enrolledCourseController={
createEnrolledCourseIntoDB
}