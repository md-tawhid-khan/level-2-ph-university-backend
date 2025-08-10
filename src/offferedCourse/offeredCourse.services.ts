
import status from "http-status";
import appError from "../errors/appErrors";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { CourseFaculty, courseModel } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";

const createOfferedCourseIntoDB=async (payload:TOfferedCourse)=>{
    const {
     semesterRegistration,academicFaculty,academicDepartment,course,faculty
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
    
 const result=await OfferedCourse.create({...payload,academicSemester})
 return result
}

export const offeredCourseServices={
    createOfferedCourseIntoDB,
}