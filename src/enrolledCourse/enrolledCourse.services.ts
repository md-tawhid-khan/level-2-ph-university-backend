import status from "http-status"
import appError from "../errors/appErrors"
import { OfferedCourse } from "../offferedCourse/offeredCourse.model"
import { TEnrolledCourse } from "./enrolledCourse.interface"
import { Student } from "../student/student.model"
import { EnrolledCourse } from "./enrolledCourse.model"

const createEnrolledCourseIntoDB=async(userId:string,payload:TEnrolledCourse)=>{
/**
 *step-1: check if the offered course is exist
 *step-2: if the student is already enrolled
 *step-3: create an enrolled course
 */

 const isOfferedCourseExists=await OfferedCourse.findById(payload.offeredCourse)

 if(!isOfferedCourseExists){
    throw new appError(status.NOT_FOUND,'Offered couse do not found')
 }
 if(isOfferedCourseExists.maxCapacity<=0){
     throw new appError(status.BAD_GATEWAY,'Room is full')
 }

 const student=await Student.findOne({id:userId}).select('_id')
 if(!student){
    throw new appError(status.NOT_FOUND,'student do not found')
 }

 const isStudentAlreadyEnrolled=await EnrolledCourse.findOne({
    semesterRegistration:isOfferedCourseExists?.semesterRegistration,
    offeredCourse:isOfferedCourseExists?._id,
    student:student?._id
 })

 if(isStudentAlreadyEnrolled){
    throw new appError(status.CONFLICT,'student is already enrolled !!')
 }

}

export const enrolledCourseServices={
    createEnrolledCourseIntoDB
}