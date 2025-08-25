import status from "http-status"
import appError from "../errors/appErrors"
import { OfferedCourse } from "../offferedCourse/offeredCourse.model"
import { TEnrolledCourse } from "./enrolledCourse.interface"
import { Student } from "../student/student.model"
import { EnrolledCourse } from "./enrolledCourse.model"
import mongoose from "mongoose"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"

const createEnrolledCourseIntoDB=async(userId:string,payload:TEnrolledCourse)=>{
/**
 *step-1: check if the offered course is exist
 *step-2: if the student is already enrolled
 *step-3: create an enrolled course
 */
const {offeredCourse}=payload ;

 const isOfferedCourseExists=await OfferedCourse.findById(payload.offeredCourse)

 if(!isOfferedCourseExists){
    throw new appError(status.NOT_FOUND,'Offered couse do not found')
 }
 if(isOfferedCourseExists.maxCapacity<=0){
     throw new appError(status.BAD_GATEWAY,'Room is full')
 }

 const student=await Student.findOne({id:userId},{_id:1})

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

 // check total credits exceeds maxCredits

 const semesterRegistration= await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit')
//  console.log({semesterRegistration})

 // total enrolled credit + new enroled course  credit >maxCredit


 const enrolledCourses=await EnrolledCourse.aggregate([
    {$match:{
        semesterRegistration:new mongoose.Types.ObjectId(isOfferedCourseExists.semesterRegistration),
        student:new mongoose.Types.ObjectId(student._id)
    }}
 ])
 console.log({enrolledCourses})


//  const session=await mongoose.startSession()
  
 
//    try{
//      session.startTransaction()
     
 
//  const result=await EnrolledCourse.create(
//     {
//     offeredCourse:payload.offeredCourse,
//      semesterRegistration:isOfferedCourseExists.semesterRegistration,
//      academicSemester:isOfferedCourseExists.academicSemester,
//      academicFaculty:isOfferedCourseExists.academicFaculty,
//      academicDepartment:isOfferedCourseExists.academicDepartment,
//      course:isOfferedCourseExists.course,
//      faculty:isOfferedCourseExists.faculty,
//      student:student._id,
//      isEnrolled:true,    
//  }
// )
// if(!result){
//     throw new appError(status.BAD_REQUEST,'failde to enroll in the course')
// }

// const maxCapacity=isOfferedCourseExists.maxCapacity
// await OfferedCourse.findByIdAndUpdate(offeredCourse,{
//     maxCapacity:maxCapacity-1
// })

//     await session.commitTransaction()
//     await session.endSession()

//    return result
   
// }
// catch (error) {
//   console.log(error)
//   await session.abortTransaction()
//   await session.endSession()
//   throw new Error("failed to create faculty")
  
// }
}

export const enrolledCourseServices={
    createEnrolledCourseIntoDB
}