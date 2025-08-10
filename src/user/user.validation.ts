import { z } from 'zod';

const CreateUserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Name must be a string' })
    .max(20, { message: 'please can not be more than 20 character' })
    .optional(),
});

export const userValidation = {
  CreateUserValidationSchema,
};
