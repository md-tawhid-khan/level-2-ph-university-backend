import { Router } from "express";
import validateRequest from "../middleware/validateRequest";

import { academicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidation } from "./academicDepartment.validation";

const router=Router()

router.post('/create-academic-department',
    validateRequest(academicDepartmentValidation.createAcademicDepartmentValidation),
    academicDepartmentController.createAcademicDepartment)

router.get('/',academicDepartmentController.getAllAcademicDepartment)

router.get('/:departmentId',academicDepartmentController.getSingleAcademicDepartment)

router.patch('/update/:departmentId',validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidation),academicDepartmentController.updateAcademicDepartment)

export const academicDepartmentRouter=router ;