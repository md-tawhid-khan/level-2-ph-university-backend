import { Student } from "./student.model"

const getAllStudent=async()=>{
    const result =await Student.find()
    return result
}

export const studentService={
    getAllStudent
}