import { z } from "zod";

const createFacultyValidationSchema=z.object({
    body:z.object({
        id:z.string(),
          user:z.string(),
          name:z.string(),
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