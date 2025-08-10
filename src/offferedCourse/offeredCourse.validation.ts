import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const createOfferedCourseValidationSchema=z.object({
body:z.object({
    semesterRegistration:z.string(),
    academicSemester:z.string().optional(),
    academicFaculty:z.string(),
   academicDepartment:z.string(),
   course:z.string(),
   faculty:z.string(),
   maxCapacity:z.number(),
   section:z.number(),
   days:z.array(z.enum([...Days] as [string, ...string[]] )),
   startTime:z.string().refine((time)=>{
    const regex=/^(?:[01]\d|2[0-3]):[0-5]\d$/ ;
    return regex.test(time)
   },{
     message:"Invalid time formate: insert hh:mm formate"
   }), //HH:MM 00-23 : 00-59
   endTime:z.string().refine((time)=>{
    const regex=/^(?:[01]\d|2[0-3]):[0-5]\d$/ ;
    return regex.test(time)
   },{
     message:"Invalid time formate: insert hh:mm formate"
   })
}).refine((body)=>{
    const start=new Date(`1970-01-01T${body.startTime}:00`);
    const end=new Date(`1970-01-01T${body.endTime}:00`);
    return end>start
},{
    message:"start time should be before end time"
})
})

const updateOfferedCourseValidationSchema=z.object({
   body:z.object({
    faculty:z.string().optional(),
    maxCapacity:z.number().optional(),
    days:z.array(z.enum([...Days] as [string,...string[]]).optional()),
    startTime:z.string().optional(),
    endTime:z.string().optional()
   })
})

export const offeredCourseValidation={
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}