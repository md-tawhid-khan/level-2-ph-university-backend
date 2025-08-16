import { SemesterRegistration } from './../semesterRegistration/semesterRegistration.model';
import { AcademicFaculty } from './../academicFaculty/academicFaculty.model';

import status from "http-status";
import appError from "../errors/appErrors";

import {  TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import {  courseModel } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from './offeredCourse.utils';


const createOfferedCourseIntoDB=async (payload:TOfferedCourse)=>{
    const {
     semesterRegistration,academicFaculty,academicDepartment,course,faculty,section,days,startTime,endTime
    }=payload;
    //check if the semester registration id is exist
    const isSemesterRegistrationExist =await SemesterRegistration.findById(semesterRegistration)
 if(!isSemesterRegistrationExist){
    throw new appError(status.NOT_FOUND,'semester registration not found')
 }
 const academicSemester=isSemesterRegistrationExist.academicSemester ;
  
   const isAcademicFacultyExist =await AcademicFaculty.findById(academicFaculty)
 if(!isAcademicFacultyExist){
    throw new appError(status.NOT_FOUND,'academic faculty not found')
 }

   const isAcademicDepartmentExist =await AcademicDepartment.findById(academicDepartment)
 if(!isAcademicDepartmentExist){
    throw new appError(status.NOT_FOUND,'academic department not found')
 }

  const isCourseExist =await courseModel.findById(course)
 if(!isCourseExist){
    throw new appError(status.NOT_FOUND,'course  not found')
 }

  const isFacultyEXist=await Faculty.findById(faculty)
 if(!isFacultyEXist){
    throw new appError(status.NOT_FOUND,'faculty not found')
 }

 // check if the department is belong to the faculty
 const isDepartmentBelongToFaculty=await AcademicDepartment.findOne({
   _id:academicDepartment,
   academicFaculty
 })
 if(!isDepartmentBelongToFaculty){
   throw new appError(status.BAD_REQUEST,`this ${isAcademicDepartmentExist.name} is not belongs to this ${isAcademicFacultyExist.name}`)
 }
 
 // check if the same offered course same section in same registration semester exist

 const isSameOfferedCourseExistsWithTheSameRegisteredSemesterWithTheSameSection=await OfferedCourse.findOne({
   course,
   semesterRegistration,
   section
 })
 if(isSameOfferedCourseExistsWithTheSameRegisteredSemesterWithTheSameSection){
   throw new appError(status.BAD_REQUEST,`Offered course with same section is already exist !!!!`)
 }

 // get the schedules of the faculties
  const assignSchedules= await OfferedCourse.find({
    semesterRegistration,
    academicFaculty,
     days:{$in:days}
  }).select('days startTime endTime ')

  // console.log(assignSchedules)

  const newSchedules={
    days,
    startTime,
    endTime
  }
  
 if(hasTimeConflict(assignSchedules,newSchedules)){
     throw new appError(status.CONFLICT,'this faculty is not available at this time , choose another time')
 }


 // ----------- create offered course -----------
 const result=await OfferedCourse.create({...payload,academicSemester})

//  return null
 return result
}

//update offered course

const updateOfferCourseIntoDB=async(id:string,payload:Pick<TOfferedCourse,'faculty'|'maxCapacity'|'days'|'startTime'|'endTime'>)=>{
const {faculty,days,startTime,endTime}=payload;
const isOfferedCourseExist=await  OfferedCourse.findById(id)
if(!isOfferedCourseExist){
   throw new appError(status.NOT_FOUND,'offered course not found')
}

  const isFacultyEXist=await Faculty.findById(faculty)
  if(!isFacultyEXist){
    throw new appError(status.NOT_FOUND,'faculty not found')
  }

  const semesterRegistration=isOfferedCourseExist.semesterRegistration;

  const semesterRegistrationStatus=await SemesterRegistration.findById(semesterRegistration)

 if( semesterRegistrationStatus?.status!=='UPCOMING'){
  throw new appError(status.NOT_FOUND,`you can not update this offered course as it as ${semesterRegistrationStatus?.status}`)
 }

  
   // get the schedules of the faculties
  const assignSchedules= await OfferedCourse.find({
    SemesterRegistration,
    faculty,
     days:{$in:days}
  }).select('days startTime endTime ')

  // console.log(assignSchedules)

  const newSchedules={
    days,
    startTime,
    endTime
  }
  
  if(hasTimeConflict(assignSchedules,newSchedules)){
     throw new appError(status.CONFLICT,'this faculty is not available at this time , choose another time')
 }



const result= await OfferedCourse.findByIdAndUpdate(id,payload,{new:true})
return result
}

export const offeredCourseServices={
    createOfferedCourseIntoDB,
    updateOfferCourseIntoDB
}