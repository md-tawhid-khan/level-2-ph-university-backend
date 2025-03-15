import { z } from "zod";

const userNameValidation=z.object({
    firstName:z.string().min(1).max(20).refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
        }),
     middleName:z.string(),
     lastName:z.string()       
})

const gurdianValidation=z.object({
    name:z.string(),
    relationWithStudent:z.string(),
    ocupation:z.string(),
    contactNo:z.string()
})
const localGurdianValidation=z.object({
    name:z.string(),
    relationWithStudent:z.string(),
    ocupation:z.string(),
    contactNo:z.string()
})

const studentValidation=z.object({
    body:z.object({
        student:z.object({
            name:userNameValidation,
            gender:z.enum(['male','female','other']),
            dateOfBirth:z.string(),
            email:z.string(),
            contactNo:z.string(),
            emergencyContactNo:z.string(),
            presentAddress:z.string(),
            permanentAddress:z.string(),
            guardian:gurdianValidation,
            localGuardian:localGurdianValidation,
            profileImage:z.string(),
            academicDepartment:z.string()}),
    })
})

export default studentValidation ;