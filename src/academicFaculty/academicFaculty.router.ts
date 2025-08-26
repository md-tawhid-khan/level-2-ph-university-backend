import { Router } from "express"
import { academicFacultyController } from "./academicFaculty.controller"
import validateRequest from "../middleware/validateRequest"
import { academicFacultyValidationSchema } from "./academicFaculty.validation"
import authTokenValidation from "../middleware/authMidleware"
import { USER_ROLE } from "../user/user.constant"


const router=Router()

router.post('/create-academic-faculty',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(academicFacultyValidationSchema.createAcademicFacultyValidationSchema) ,academicFacultyController.createAcademicFacultyIntoDB)

router.get('/',academicFacultyController.getAllAcademicFacultyFromDB)

router.get('/:facultyId',academicFacultyController.getSingleAcademicFacultyFromDB)

router.patch('/update/:facultyId',validateRequest(academicFacultyValidationSchema.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFacultyIntoDB)

export const academicFacultyRouter=router ;

