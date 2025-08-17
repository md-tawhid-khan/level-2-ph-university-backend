import { Router } from 'express';
import { userController } from './user.controller';
// import { AnyZodObject } from "zod";

import validateRequest from '../middleware/validateRequest';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(userValidation.CreateUserValidationSchema),
  userController.createStudent,
);
router.post(
  '/create-user-faculty',
  validateRequest(userValidation.CreateUserValidationSchema),
  userController.createFaculty,
);

export const userRouters = router;
