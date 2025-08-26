import { Router } from "express";
import { enrolledCourseController } from "./enrolledCourse.controller";
import validateRequest from "../middleware/validateRequest";
import { enrolledCourseValidation } from "./enrolledCourse.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";


const router= Router()

router.post('/create-enrolled-course',authTokenValidation(USER_ROLE.student), validateRequest(enrolledCourseValidation.createEnrolledCourseValidationZodSchema), enrolledCourseController.createEnrolledCourseIntoDB)

router.patch('/update-enrolled-course-marks',authTokenValidation(USER_ROLE.faculty), validateRequest(enrolledCourseValidation.updateEnrolledCourseValidationZodSchema), enrolledCourseController.updateEnrolledCourseMarks)

export const enrolledCourseRouter=router