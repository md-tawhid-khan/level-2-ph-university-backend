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

const updateCourseIntoDB=async(id:string,payload:Partial<TCourse>)=>{
   const {preRequisiteCourse,...courseRemainingData}=payload ;

   // step 1 :basic course info  update 
   const updateBasicInfoCourse=await courseModel.findByIdAndUpdate(id,courseRemainingData,{new:true,runValidators:true}) 

   // check if there  is any pre requisite course to updata
 
   if(preRequisiteCourse && preRequisiteCourse.length>0){
           
           // filter out the deleted preRequisite course 

        const deletedPreRequisites=preRequisiteCourse.filter(el=>el.course && el.isDelete).map(el=>el.course)
        
        const deletedPreRequisitesCourse=await courseModel.findByIdAndUpdate(id,{
            $pull:{preRequisiteCourse:{course:{$in:deletedPreRequisites}}}
        },{new:true})

        // filter out to add preRequisite course 
        const newPreRequisite=preRequisiteCourse.filter(el=>el.course && !el.isDelete)

        const newPreRequisiteCourse=await courseModel.findByIdAndUpdate(id,{
          $addToSet:{preRequisiteCourse:{$each:newPreRequisite}}  
        })

        
   }

   const result = await courseModel.findById(id).populate("preRequisiteCourse.course")


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
    updateCourseIntoDB,
    deleteSingleCourseFromDB
}