import { Student } from "./student.model"

const getAllStudent=async()=>{
    const result =await Student.find()
    return result
}

const getSingleStudent=async(id:string)=>{
    const result = await Student.findOne({_id:id})
    return result
}

export const studentService={
    getAllStudent,
    getSingleStudent
}