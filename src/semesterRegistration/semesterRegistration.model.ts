import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistrationConstant";

const semesterRegistrationSchema=new Schema<TSemesterRegistration>({
    academicSemester:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
    ref:'academicSemester'},
   status:{
    type:String,
    enum:semesterRegistrationStatus,
    default:"UPCOMING"
   },
   startDate:{
    type:Date,
    required:true,
   },
   endDate:{
    type:Date,
    required:true,
   },
   minCredit:{
    type:Number,
    default:3,
   },
   maxCredit:{
    type:Number,
    default:15
   }
},
{
    timestamps:true,
})

export const SemesterRegistration=model<TSemesterRegistration>('SemesterRegistration',semesterRegistrationSchema)