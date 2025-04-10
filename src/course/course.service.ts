import mongoose from "mongoose";
import queryBilder from "../builder/queryBilder";
import { courseSearchableField } from "./course.constance";
import { TCourse, TCoursefaculty } from "./course.interface";
import {  CourseFaculty, courseModel } from "./course.model";
import appError from "../errors/appErrors";
import status from "http-status";


const createCourseIntoDB=async(payload:TCourse)=>{
    const result=await courseModel.create(payload)
    return result
}

const getAllCourseFromDB=async(query:Record<string,unknown>)=>{
    const courseQuery=new queryBilder(
        courseModel.find().populate('preRequisiteCourse.course'),query).search(courseSearchableField).filter().sort().paginate().fields()
    const result=await courseQuery.modelQuery
    return result
}

const getSingleCourseFromDB=async(id:string)=>{
    const result=await courseModel.findById(id).populate('preRequisiteCourse.course')
    return result
}

const updateCourseIntoDB=async(id:string,payload:Partial<TCourse>)=>{
   const {preRequisiteCourse,...courseRemainingData}=payload ;

   const session=await mongoose.startSession()
 try{
   session.startTransaction()
   // step 1 :basic course info  update 
   const updateBasicInfoCourse=await courseModel.findByIdAndUpdate(id,
    courseRemainingData,
    {new:true,
        runValidators:true,
        session
    }) 
    if(!updateBasicInfoCourse){
        throw new appError(status.BAD_REQUEST,'failed to update course')
    }

   // check if there  is any pre requisite course to updata
 
   if(preRequisiteCourse && preRequisiteCourse.length>0){
           
           // filter out the deleted preRequisite course 

        const deletedPreRequisites=preRequisiteCourse.filter(el=>el.course && el.isDelete).map(el=>el.course)
        
        const deletedPreRequisitesCourse=await courseModel.findByIdAndUpdate(id,
            {
            $pull:{preRequisiteCourse:{course:{$in:deletedPreRequisites}}}
        },
        {
            new:true,
            runValidators:true,
            session
        })
        if(!deletedPreRequisitesCourse){
            throw new appError(status.BAD_REQUEST,'failed to update course')
        }

        // filter out to add preRequisite course 
        const newPreRequisite=preRequisiteCourse?.filter(el=>el.course && !el.isDelete)

        const newPreRequisiteCourse=await courseModel.findByIdAndUpdate(id,
            {
          $addToSet:{preRequisiteCourse:{$each:newPreRequisite}}  
        },
        {
            new:true,
            runValidators:true,
            session
        })
        if(!newPreRequisiteCourse){
            throw new appError(status.BAD_REQUEST,'failed to update course')
        }
        const result = await courseModel.findById(id).populate("preRequisiteCourse.course")
        return result
   }

  

   await session.commitTransaction()
   await session.endSession()
} catch(error){
    await session.abortTransaction()
    await session.endSession()
    throw new appError(status.BAD_REQUEST,'failed to update course')
}
}

const deleteSingleCourseFromDB=async(id:string)=>{
    const result=await courseModel.findByIdAndUpdate(id,{isDelete:true})
    return result
}

const assignFacultiesWithCourseIntoDB = async (
    id: string,
    payload: Partial<TCoursefaculty>,
  ) => {
    const result = await CourseFaculty.findByIdAndUpdate(
      id,
      {
        course: id,
        $addToSet: { faculties: { $each: payload.faculties } },
      },
      {
        upsert: true,
        new: true,
      },
    );
    return result;
  };
  

export const courseService={
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteSingleCourseFromDB,
    assignFacultiesWithCourseIntoDB
}