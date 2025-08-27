import { Router } from "express";
import { offeredCourseController } from "./offeredCourse.controller";
import { offeredCourseValidation } from "./offeredCourse.validation";
import validateRequest from "../middleware/validateRequest";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.post('/create-offered-course',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin) ,validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse)

router.get('/',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),offeredCourseController.getAllOfferedCourseFromDB)

router.get('/my-offered-courses',authTokenValidation(USER_ROLE.student),offeredCourseController.getMyOfferedCourseFromDB)

router.get('/:id',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student), offeredCourseController.getSingleOfferedCourseFromDB)

router.patch('/:id',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin), validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),offeredCourseController.updateOfferedCourseController)

router.delete('/:id',authTokenValidation(USER_ROLE.superAdmin,USER_ROLE.admin),offeredCourseController.deleteSpecificOfferedCourseFromDB)

export const offeredCourseRouter=router