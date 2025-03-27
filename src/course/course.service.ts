import queryBilder from "../builder/queryBilder";
import { courseSearchableField } from "./course.constance";
import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";


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

const deleteSingleCourseFromDB=async(id:string)=>{
    const result=await courseModel.findByIdAndUpdate(id,{isDelete:true})
    return result
}

export const courseService={
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    deleteSingleCourseFromDB
}