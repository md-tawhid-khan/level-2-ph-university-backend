import { Router } from "express";
import validateRequest from "../middleware/validateRequest";

import { academicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.post('/create-academic-department',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),
    validateRequest(academicDepartmentValidation.createAcademicDepartmentValidation),
    academicDepartmentController.createAcademicDepartment)

router.get('/',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),academicDepartmentController.getAllAcademicDepartment)

router.get('/:departmentId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),academicDepartmentController.getSingleAcademicDepartment)

router.patch('/update/:departmentId',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidation),academicDepartmentController.updateAcademicDepartment)

export const academicDepartmentRouter=router ;