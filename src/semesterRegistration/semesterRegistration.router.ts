import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { semesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.post('/create-semester-registration',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,), validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidation),semesterRegistrationController.createSemseterRegistration)

router.get('/',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student), semesterRegistrationController.getAllSemesterRegistration)

router.get('/:semesterRegistrationId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student), semesterRegistrationController.getSingleSemesterRegistration) 

router.patch('/:semesterRegistrationId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,), validateRequest(semesterRegistrationValidation.updateSemesterRegistrationValidation), semesterRegistrationController.updateSemesterRegistration)

export const semesterRegistrationRouter=router ;