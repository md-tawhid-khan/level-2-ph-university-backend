import { z } from "zod";

const createAcademicDepartmentValidation=z.object({
    body:z.object({
        name:z.string({
        invalid_type_error:"academic department name must be string",
        required_error:"Name is required"
        }),
        academicFaculty:z.string({
            invalid_type_error:"academic department name must be string",
            required_error:"academicFaculty is required"
        })
    })
})

const updateAcademicDepartmentValidation=z.object({
    body:z.object({
        name:z.string({
            invalid_type_error:"academic department name must be string",
            required_error:"name is required"
        }).optional(),
        academicFaculty:z.string({
             invalid_type_error:"academic department must be string",
             required_error:"academicFaculty is required"
        }).optional()
    })
})



export const academicDepartmentValidation={
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}