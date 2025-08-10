import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { CourseFaculty, courseModel } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Days } from './offeredCourse.constant';
import { TOfferedCourse, } from './offeredCourse.interface';
import mongoose, { model, Schema } from "mongoose";

const offeredCourseSchema=new mongoose.Schema<TOfferedCourse>(
    {
    semesterRegistration:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:SemesterRegistration
    },
    academicSemester:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:AcademicSemester,
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:AcademicFaculty
    },
    academicDepartment:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:AcademicDepartment
    },
    course:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:courseModel
    },
    faculty:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:CourseFaculty
    },
    maxCapacity:{
        type:Number,
        required:true,
    },
    section:{
        type:Number,
        required:true
    },
    days:[{
        type:String,
        enum:Days
    }],
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },  
},
 {timestamps:true}
 
)

export const OfferedCourse=model<TOfferedCourse>('OfferedCourse',offeredCourseSchema)