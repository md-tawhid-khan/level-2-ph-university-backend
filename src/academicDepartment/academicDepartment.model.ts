import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema=new Schema<TAcademicDepartment>({
    name:{type:String,require:true,unique:true},
    academicFaculty:{type:Schema.Types.ObjectId,ref:"AcademicFaculty"}
},{
    timestamps:true
})

academicDepartmentSchema.pre('save',async function(next){
      const isExistDepartmentName=await AcademicDepartment.findOne({
        name:this.name 
      })
      if(isExistDepartmentName){
        throw new Error("this department is already existed")
      }
      next()
})

academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
    const query=this.getQuery();
    const isExistDepartmentName=await AcademicDepartment.findOne(query)
    
    if(!isExistDepartmentName){
        throw new Error("department does not exits")
    }

    next()
})

export const AcademicDepartment=model<TAcademicDepartment>('academicDepartment',academicDepartmentSchema) 

