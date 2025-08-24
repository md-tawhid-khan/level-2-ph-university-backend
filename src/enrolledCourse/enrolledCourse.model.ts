
import { model, Schema } from "mongoose"
import { TCourseMark, TEnrolledCourse } from "./enrolledCourse.interface"
import { grade } from "./enrolledCourse.constant"

const courseMarks=new Schema<TCourseMark>({
classTest1:{
    type:Number,
    default:0
},
midTerm:{
    type:Number,
    default:0
},
classTest2:{
    type:Number,
    default:0
},
finalTest:{
    type:Number,
    default:0
},
},
{
    _id:false
}
)


const createEnrolledCourseSchema=new Schema<TEnrolledCourse>({
 offeredCourse:{
    type:Schema.Types.ObjectId,
    ref:'OfferedCourse',
    required:true
},
 semesterRegistration:{
    type:Schema.Types.ObjectId,
    ref:'SemesterRegistration',
    required:true
},
 academicSemester:{
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester',
    required:true
},
 academicFaculty:{
    type:Schema.Types.ObjectId,
    ref:'AcademicFaculty',
    required:true
},
 academicDepartment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment',
    required:true
},
 course:{
    type:Schema.Types.ObjectId,
    ref:'CourseFaculty',
    required:true
},
 faculty:{
    type:Schema.Types.ObjectId,
    ref:'Faculty',
    required:true
},
 student:{
    type:Schema.Types.ObjectId,
    ref:'Student',
    required:true
},
isEnrolled:{
        type:Boolean,
        required:true,
        default:false
    },
courseMarks:{
    type:courseMarks,
    required:true
}  ,
grade:{
    type:String,
    enum:grade,
    default:'NA'
}  ,
gradePoints:{
    type:Number,
    max:4,
    min:0,
    default:0,
    required:true
},
isComplete:{
    type:Boolean,
    required:true,
    default:false
}

})

export const EnrolledCourse=model<TEnrolledCourse>('EnrolledCourse',createEnrolledCourseSchema)
