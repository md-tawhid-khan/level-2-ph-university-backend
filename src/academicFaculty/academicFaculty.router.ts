import { Router } from "express"
import { academicFacultyController } from "./academicFaculty.controller"
import validateRequest from "../middleware/validateRequest"
import { academicFacultyValidationSchema } from "./academicFaculty.validation"
import authTokenValidation from "../middleware/authMidleware"
import { USER_ROLE } from "../user/user.constant"


const router=Router()

router.post('/create-academic-faculty',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(academicFacultyValidationSchema.createAcademicFacultyValidationSchema) ,academicFacultyController.createAcademicFacultyIntoDB)

router.get('/',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),academicFacultyController.getAllAcademicFacultyFromDB)

router.get('/:facultyId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),academicFacultyController.getSingleAcademicFacultyFromDB)

router.patch('/update/:facultyId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(academicFacultyValidationSchema.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFacultyIntoDB)

export const academicFacultyRouter=router ;

