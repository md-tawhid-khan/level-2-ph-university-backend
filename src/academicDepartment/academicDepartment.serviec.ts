import queryBilder from "../builder/queryBilder";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartment=async(payload:TAcademicDepartment)=>{
    const result=(await AcademicDepartment.create(payload))
    return result
}

const getAllAcademicDepartment=async(query:Record<string,unknown>)=>{
    const academicDepartmentQuery= new queryBilder(AcademicDepartment.find().populate('academicFaculty'),query)
    const result=await academicDepartmentQuery.modelQuery
    const meta=await academicDepartmentQuery.countTotal()
    return {
        meta,
        result}
}

const getSingleAcademicDepartment=async(id:string)=>{
    const result=await AcademicDepartment.findById(id).populate('academicFaculty')   
    return result
}

const updateAcademicDepartment=async(id:string,payload:TAcademicDepartment)=>{
    const result=await AcademicDepartment.findByIdAndUpdate(id,payload,{new:true})
    return result
}

export const academicDepartmentService={
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}
