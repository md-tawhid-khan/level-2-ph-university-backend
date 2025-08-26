import { Router } from 'express';
import validateRequest from '../middleware/validateRequest';
import { academicSemesterValidation } from './academicSemesterValidation';
import { academicSemesterController } from './academicSemester.controller';
import authTokenValidation from '../middleware/authMidleware';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-academic-semester',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createAcademicSemesterController,
);
router.get('/',academicSemesterController.getAllAcademicSemesterFromDB)
router.get('/:semesterId',academicSemesterController.getSingleAcademicSemesterFromDB)
router.patch('/:semesterId', validateRequest(academicSemesterValidation.updateAcademicSemesterValidation), academicSemesterController.updateAcademicSemesterInformation )
export const academicSemesterRouter = router;
