import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.post('/create-course',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin), validateRequest(courseValidation.courseSchemaValidation),courseController.createCourseIntoDB)

router.get('/',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student), courseController.getAllCourseFromDB)

router.get('/:courseId',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student), courseController.getSingleCourseFromDB)

router.delete('/:courseId',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin), courseController.deleteSingleCourseFromDB)

router.patch('/:courseId',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(courseValidation.updateCourseSchemaValidation), courseController.updateCourseIntoDB)

router.put('/:courseId/assign-faculties',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin), validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.assignFacultiesWithCourseIntoDB)

router.get('/:courseId/get-faculties',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student), courseController.getFacultiesWithCourseIntoDB)

router.delete('/:courseId/remove-faculties',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin), validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.removeFacultiesWithCourseIntoDB)

export const courseRouter=router ;