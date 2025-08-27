
import { Router } from "express";
import { facultyController } from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";
import validateRequest from "../middleware/validateRequest";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";


const router=Router()

router.get('/',authTokenValidation(USER_ROLE.faculty,USER_ROLE.admin,USER_ROLE.faculty), facultyController.getAllFacultyFromDB)

router.get('/:id',authTokenValidation(USER_ROLE.faculty,USER_ROLE.admin,USER_ROLE.faculty), facultyController.getSingleFacultyFromDB)

router.patch('/update/:facultyId',authTokenValidation(USER_ROLE.faculty,USER_ROLE.admin),  validateRequest(facultyValidation.updateFacultyValidationSchema),facultyController.updateFacultyIntoDB)

router.delete('/delete/:facultyId',authTokenValidation(USER_ROLE.faculty,USER_ROLE.admin),  facultyController.deleteFacultyIntoDB)

export const facultyRouter=router