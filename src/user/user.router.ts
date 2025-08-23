import { Router } from 'express';
import { userController } from './user.controller';
// import { AnyZodObject } from "zod";

import validateRequest from '../middleware/validateRequest';
import { userValidation } from './user.validation';
import authTokenValidation from '../middleware/authMidleware';
import { USER_ROLE } from './user.constant';


const router = Router();

router.post(
  '/create-user-student',authTokenValidation(USER_ROLE.admin),
  validateRequest(userValidation.CreateUserValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-user-faculty',
  validateRequest(userValidation.CreateUserValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-user-admin',
  validateRequest(userValidation.CreateUserValidationSchema),
  userController.createAdmin,
);

router.post(
  '/change-status/:id',authTokenValidation(USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus,
);

router.get(
  '/me', authTokenValidation(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  userController.getMe,
);

export const userRouters = router;
