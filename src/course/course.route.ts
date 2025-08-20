import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.post('/create-course',authTokenValidation(USER_ROLE.admin), validateRequest(courseValidation.courseSchemaValidation),courseController.createCourseIntoDB)
router.get('/',courseController.getAllCourseFromDB)
router.get('/:courseId',courseController.getSingleCourseFromDB)
router.put('/:courseId/assign-faculties',authTokenValidation(USER_ROLE.admin), validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.assignFacultiesWithCourseIntoDB)
router.delete('/:courseId/remove-faculties',authTokenValidation(USER_ROLE.admin), validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.removeFacultiesWithCourseIntoDB)
router.delete('/:courseId',authTokenValidation(USER_ROLE.admin), courseController.deleteSingleCourseFromDB)
router.patch('/:courseId',authTokenValidation(USER_ROLE.admin),validateRequest(courseValidation.updateCourseSchemaValidation), courseController.updateCourseIntoDB)

export const courseRouter=router ;