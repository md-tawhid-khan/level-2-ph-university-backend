import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../middleware/validateRequest';
import { userValidation } from './user.validation';
import authTokenValidation from '../middleware/authMidleware';
import { USER_ROLE } from './user.constant';
import { upload } from '../utily/sendImageToCloudinary';
import { studentValidation } from '../student/student.validation';
import { adminValidation } from '../admin/admin.validation';
import { facultyValidation } from '../faculty/faculty.validation';



const router = Router();

router.post(
  '/create-user-student',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data)
    next()
  },
  validateRequest(studentValidation.createStudentValidation),
  userController.createStudent,
);

router.post(
  '/create-user-faculty',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('file'),
 (req:Request,res:Response,next:NextFunction)=>{
  req.body=JSON.parse(req.body.data)
  next()
 },
 validateRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty
)

router.post(
  '/create-user-admin',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data)
    next()
  },
  validateRequest(adminValidation.createAdminValidation),
  userController.createAdmin,
);

router.post(
  '/change-status/:id',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus,
);

router.get(
  '/me', authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  userController.getMe,
);

export const userRouters = router;
