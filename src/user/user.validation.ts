
import { z } from "zod";

const userValidationSchema=z.object({
    id:z.string(),
    password:z.string().max(20,{message:'please can not be more than 20 character'}),
    needChangePassword:z.boolean().optional().default(true),
    role:z.enum(['admin','faculty','student']),
    status:z.enum(['in-progress','blocked']).default('in-progress'),
    isDeleted:z.boolean().optional().default(false)
})

export const userValidation={
    userValidationSchema
}