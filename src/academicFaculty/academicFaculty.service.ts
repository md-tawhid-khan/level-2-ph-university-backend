import { TAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFaculty } from "./academicFaculty.model"

const createAcademicFacultyIntoDB=async(payload:TAcademicFaculty)=>{
    const result=await AcademicFaculty.create(payload)
    return result
}

const getAllAcademicFacultyFromDB=async()=>{
    const result=await AcademicFaculty.find()
    return result
}

const getSingleAcademicFacultyFromDB=async(id:string)=>{
    const result=await AcademicFaculty.findById(id)
    return result
}

const updateAcademicFacultyIntoDB=async(id:string,data:TAcademicFaculty)=>{
    const result=await AcademicFaculty.findByIdAndUpdate(id,data,{new:true})
    return result
}

export const academicFacultyServices={
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}