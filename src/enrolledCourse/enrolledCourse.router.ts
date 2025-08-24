import { Router } from "express";
import { enrolledCourseController } from "./enrolledCourse.controller";
import validateRequest from "../middleware/validateRequest";
import { enrolledCourseValidation } from "./enrolledCourse.validation";


const router= Router()

router.post('/create-enrolled-course',validateRequest(enrolledCourseValidation.createEnrolledCourseValidationZodSchema), enrolledCourseController.createEnrolledCourseIntoDB)

export const enrolledCourseRouter=router