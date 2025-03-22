import { Router } from 'express';
import { userController } from './user.controller';
// import { AnyZodObject } from "zod";

import validateRequest from '../middleware/validateRequest';
import { studentValidation } from '../student/student.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidation.createStudentValidation),
  userController.createStudent,
);

export const userRouters = router;
