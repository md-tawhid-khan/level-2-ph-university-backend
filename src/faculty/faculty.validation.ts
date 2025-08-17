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
        id:z.string(),
          user:z.string(),
          name:userNameValidation,
          designation:z.string(),
          gender:z.string(),
          dateOfBirth:z.string(),
          email:z.string(),
          contactNo:z.string(),
          emergencyContactNo:z.string(),
          presentAddress:z.string(),
          permanentAddress:z.string(),
          profileImage:z.string(),
          academicFaculty:z.string(),
          academicDepartment:z.string(),
          isDelete:z.boolean()
    })
})
export const facultyValidation={
    createFacultyValidationSchema
}