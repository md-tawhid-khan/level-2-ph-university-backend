import { z } from "zod";

const createdUserNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const createAdminValidation=z.object({
  body:z.object({
    "admin":z.object({
     
        "name":createdUserNameValidation,
        "designation":z.string(),
        "gender":z.string(),
        "dateOfBirth":z.string(),
        "email":z.string(),
        "contactNo":z.string(),
        "emergencyContactNo":z.string(),
        "presentAddress":z.string(),
        "permanentAddress":z.string(),
        "profileImage":z.string(),
        "managementDepartment":z.string(),
        "isDelete":z.boolean()
    })
  })
})

const updatedUserNameValidation = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
}).optional();

const updatedAdminValidation = z.object({
  body: z.object({
    admin: z.object({
      name: updatedUserNameValidation,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: z.string().optional(),
      localGuardian: z.string().optional(),
      profileImage: z.string().optional(),
      admissionSemester:z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  })
});

export const adminValidation={
  createAdminValidation,
 updatedAdminValidation
}