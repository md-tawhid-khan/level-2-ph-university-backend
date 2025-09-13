import { z } from "zod";

const userNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
})

const createFacultyValidationSchema=z.object({
    body:z.object({
      faculty:z.object({
          name:userNameValidation,
          designation:z.string(),
          gender:z.string(),
          email:z.string(),
          contactNo:z.string(),
          emergencyContactNo:z.string(),
          presentAddress:z.string(),
          permanentAddress:z.string(),
          academicDepartment:z.string(),
    })
    })
})
//--------------update faculty validation ----------
const updateUserNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
}).optional()

const updateFacultyValidationSchema=z.object({
    body:z.object({
                  
          name:updateUserNameValidation,
          designation:z.string().optional(),
          gender:z.string().optional(),
          dateOfBirth:z.string().optional(),
          email:z.string().optional(),
          contactNo:z.string().optional(),
          emergencyContactNo:z.string().optional(),
          presentAddress:z.string().optional(),
          profileImage:z.string().optional(),
          academicFaculty:z.string().optional(),
          academicDepartment:z.string().optional(),
          isDelete:z.boolean().optional()
    })
})
export const facultyValidation={
    createFacultyValidationSchema,
    updateFacultyValidationSchema
}