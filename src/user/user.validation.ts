import { z } from 'zod';

const CreateUserValidationSchema = z.object({
  body:z.object({
      password: z
         .string({ invalid_type_error: 'password must be a string' })
         .max(20, { message: 'please can not be more than 20 character' }),

     status: z.enum(['in-progress', 'blocked']).optional(),
  })
});

export const userValidation = {
  CreateUserValidationSchema,
};
