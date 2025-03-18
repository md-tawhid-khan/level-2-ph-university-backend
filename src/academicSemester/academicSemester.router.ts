import { Router } from 'express';
import validateRequest from '../middleware/validateRequest';
import { academicSemesterValidation } from './academicSemesterValidation';
import { academicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createAcademicSemesterController,
);
router.get('/',academicSemesterController.getAllAcademicSemesterFromDB)
router.get('/:semesterId',academicSemesterController.getSingleAcademicSemesterFromDB)
router.patch('/:semesterId', validateRequest(academicSemesterValidation.updateAcademicSemesterValidation), academicSemesterController.updateAcademicSemesterInformation )
export const academicSemesterRouter = router;
