import { query } from 'express';
import { grade } from './enrolledCourse.constant';
import status from "http-status"
import appError from "../errors/appErrors"
import { OfferedCourse } from "../offferedCourse/offeredCourse.model"
import { TEnrolledCourse } from "./enrolledCourse.interface"
import { Student } from "../student/student.model"
import { EnrolledCourse } from "./enrolledCourse.model"
import mongoose from "mongoose"
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import {  courseModel } from "../course/course.model"
import { Faculty } from "../faculty/faculty.model"
import { calculateGradeAndPoints } from "./enrolledCourse.utils"
import queryBilder from '../builder/queryBilder';

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

 const course=await courseModel.findById(isOfferedCourseExists.course)
 const currentCredit=course?.credits

 const semesterRegistration= await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit')
 const maxCredits=semesterRegistration?.maxCredit

//  console.log({semesterRegistration})

 
 const enrolledCourses=await EnrolledCourse.aggregate([
    {$match:{
        semesterRegistration:new mongoose.Types.ObjectId(isOfferedCourseExists.semesterRegistration),
        student:new mongoose.Types.ObjectId(student._id)
    }
},
{
    $lookup:{
        from:'courses',
        localField:'course',
        foreignField:'_id',
        as:'enrolledCoursesData'
    }
},
{
    $unwind:'$enrolledCoursesData'
},
 {
    $group:{
        _id:null,
        "totalEnrolledCredits":{$sum:'$enrolledCoursesData.credits'}
    }
},
{
    $project:{
        _id:0,
        totalEnrolledCredits:1
    }
}

 ])
//  console.log({enrolledCourses})

 // total enrolled credit + new enroled course  credit >maxCredit
 const totalCredits=enrolledCourses.length> 0 ? enrolledCourses[0].totalEnrolledCredits:0 ;

 if(totalCredits && currentCredit && maxCredits && totalCredits + currentCredit > maxCredits){
    throw new appError(status.BAD_REQUEST,'You have exceeded total number of credits')
 }


 const session=await mongoose.startSession()
  
 
   try{
     session.startTransaction()
     
 
 const result=await EnrolledCourse.create(
    {
    offeredCourse:payload.offeredCourse,
     semesterRegistration:isOfferedCourseExists.semesterRegistration,
     academicSemester:isOfferedCourseExists.academicSemester,
     academicFaculty:isOfferedCourseExists.academicFaculty,
     academicDepartment:isOfferedCourseExists.academicDepartment,
     course:isOfferedCourseExists.course,
     faculty:isOfferedCourseExists.faculty,
     student:student._id,
     isEnrolled:true,    
 }
)
if(!result){
    throw new appError(status.BAD_REQUEST,'failde to enroll in the course')
}

const maxCapacity=isOfferedCourseExists.maxCapacity
await OfferedCourse.findByIdAndUpdate(offeredCourse,{
    maxCapacity:maxCapacity-1
})

    await session.commitTransaction()
    await session.endSession()

   return result
   
}
catch (error) {
  console.log(error)
  await session.abortTransaction()
  await session.endSession()
  throw new Error("failed to create faculty")
  
}
}

const getMyEnrolledCourseFromDB=async(studentId:string,query:Record<string,unknown>)=>{
   
    const student=await Student.findOne({id:studentId})

    if(!student){
        throw new appError(status.NOT_FOUND,'student not found')
    }

    const enrolledCoiurseQuery= new queryBilder(EnrolledCourse.find({student:student._id}).populate('semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course faculty student'),query)

    const result=await enrolledCoiurseQuery.modelQuery ;
  const meta= await enrolledCoiurseQuery.countTotal()

  return {
    meta,
    result
  }

}

const updateEnrolledCourseMarks=async(facultyId:string,payload:Partial<TEnrolledCourse>)=>{
    
    const {semesterRegistration,offeredCourse,student,courseMarks}=payload

    const isSemesterRegistrationExists=await SemesterRegistration.findById(semesterRegistration)

    if(!isSemesterRegistrationExists){
        throw new appError(status.NOT_FOUND,'semester registration is not found')
    }

    const isOfferedCourseExists=await OfferedCourse.findById(offeredCourse)
    if(!isOfferedCourseExists){
        throw new appError(status.NOT_FOUND,'offered course is not found')
    }

    const isStudentExists=await Student.findById(student)
    if(!isStudentExists){
        throw new appError(status.NOT_FOUND,'student do not found')
    }

    const faculty  =await Faculty.findOne({id:facultyId},{_id:1}) 
    
    

    if(!faculty){
         throw new appError(status.NOT_FOUND,'faculty does not allow to update')
    }
 
   

    const isCourseBelongsToFaculty=await EnrolledCourse.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty:faculty?._id
    })

  if(!isCourseBelongsToFaculty){
      throw new appError(status.FORBIDDEN,'you are forbidden')
  }

  const modifiedData:Record<string,unknown>={
    ...courseMarks 
  }

  if(courseMarks?.finalTerm){
     const {classTest1,midTerm,classTest2,finalTerm}=isCourseBelongsToFaculty.courseMarks ;
     const totalMarks = Math.ceil(classTest1) + Math.ceil(midTerm) + Math.ceil(classTest2) + Math.ceil(finalTerm)

     const result= calculateGradeAndPoints(totalMarks)

     modifiedData.grade=result.grade;
     modifiedData.gradePoints=result.gradePoints;
     modifiedData.isComplete=true
  }

if(courseMarks && Object.keys(courseMarks).length){
    for(const[key,value] of Object.entries(courseMarks)) {
          modifiedData[`courseMarks.${key}`]=value ;
    }
}

 const result=await EnrolledCourse.findByIdAndUpdate(isCourseBelongsToFaculty._id,modifiedData,{new:true})
    return result
}

export const enrolledCourseServices={
    createEnrolledCourseIntoDB,
    getMyEnrolledCourseFromDB,
    updateEnrolledCourseMarks
}