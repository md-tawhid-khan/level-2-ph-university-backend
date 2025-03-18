import { Router } from 'express';
import { userController } from './user.controller';
// import { AnyZodObject } from "zod";
import studentValidation from '../student/student.validation';
import validateRequest from '../middleware/validateRequest';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidation),
  userController.createStudent,
);

export const userRouters = router;
