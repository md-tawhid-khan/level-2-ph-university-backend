import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { semesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";

const router=Router()

router.post('/create-semester-registration',validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidation),semesterRegistrationController.createSemseterRegistration)

router.get('/',semesterRegistrationController.getAllSemesterRegistration)

router.get('/:semesterRegistrationId',semesterRegistrationController.getSingleSemesterRegistration) 

router.patch('/:semesterRegistrationId',validateRequest(semesterRegistrationValidation.updateSemesterRegistrationValidation), semesterRegistrationController.updateSemesterRegistration)

export const semesterRegistrationRouter=router ;