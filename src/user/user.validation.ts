import { z } from 'zod';
import { userStatus } from './user.constant';

const CreateUserValidationSchema = z.object({
  body:z.object({
      password: z
         .string({ invalid_type_error: 'password must be a string' })
         .max(20, { message: 'please can not be more than 20 character' }),

     status: z.enum(['in-progress', 'blocked']).optional(),
  })
});

const changeStatusValidationSchema = z.object({
  body:z.object({
     
     status: z.enum([...userStatus] as [string, ...string[]] ),
  })
});

export const userValidation = {
  CreateUserValidationSchema,
  changeStatusValidationSchema
};
