import { z } from "zod";

  const createAcademicFacultyValidationSchema=z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:'academic faculty name must be string'
        })
    })
})

 const updateAcademicFacultyValidationSchema=z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:'academic faculty name must be string'
        })
    })
    
 })

export const academicFacultyValidationSchema ={
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}