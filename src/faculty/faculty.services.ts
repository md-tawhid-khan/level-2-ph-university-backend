import { Faculty } from "./faculty.model"

const getAllFacultyFromDB=async()=>{
     const result=await Faculty.find()
     return result
}

const getSingleFacultyFromDB=async(id:string)=>{
    const result=await Faculty.findById(id)
    return result
}

export const facultyServices={
    getAllFacultyFromDB,
    getSingleFacultyFromDB
}