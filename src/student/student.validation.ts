import { z } from 'zod';
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
});

const gurdianValidation = z.object({
  name: z.string(),
  relationWithStudent: z.string(),
  ocupation: z.string(),
  contactNo: z.string(),
});

const localGurdianValidation = z.object({
  name: z.string(),
  relationWithStudent: z.string(),
  ocupation: z.string(),
  contactNo: z.string(),
});

const createStudentValidation = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidation,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: gurdianValidation,
      localGuardian: localGurdianValidation,
      profileImage: z.string(),
      admissionSemester:z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// -----------------update student validation ------------

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
});

const updatedGurdianValidation = z.object({
  name: z.string().optional(),
  relationWithStudent: z.string().optional(),
  ocupation: z.string().optional(),
  contactNo: z.string().optional(),
});

const updatedLocalGurdianValidation = z.object({
  name: z.string().optional(),
  relationWithStudent: z.string().optional(),
  ocupation: z.string().optional(),
  contactNo: z.string().optional(),
});

const updatedStudentValidation = z.object({
  body: z.object({
    student: z.object({
      name: updatedUserNameValidation,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updatedGurdianValidation.optional(),
      localGuardian: updatedLocalGurdianValidation.optional(),
      profileImage: z.string().optional(),
      admissionSemester:z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  })
});

export const studentValidation={
  createStudentValidation,
  updatedStudentValidation,
};

