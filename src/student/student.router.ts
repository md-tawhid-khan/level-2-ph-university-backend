import { Router } from 'express';
import { studentController } from './student.controller';
import validateRequest from '../middleware/validateRequest';
import { studentValidation } from './student.validation';

const router = Router();

router.get('/all-students', studentController.getAllStudent);
router.get('/:studentId', studentController.getSingleStudent);
router.patch('/update/:studentId',validateRequest(studentValidation.updatedStudentValidation), studentController.updateStudent);
router.delete('/:studentId', studentController.deleteStudent);

export const studentRouters = router;
