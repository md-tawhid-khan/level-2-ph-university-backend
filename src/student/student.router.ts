import { Router } from 'express';
import { studentController } from './student.controller';
import validateRequest from '../middleware/validateRequest';
import { studentValidation } from './student.validation';
import authTokenValidation from '../middleware/authMidleware';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get('/all-students',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin), studentController.getAllStudent);
router.get('/:studentId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),  studentController.getSingleStudent);
router.patch('/update/:studentId', authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin), validateRequest(studentValidation.updatedStudentValidation), studentController.updateStudent);
router.delete('/:studentId', authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin), studentController.deleteStudent);

export const studentRouters = router;
