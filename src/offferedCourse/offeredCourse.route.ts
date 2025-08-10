import { Router } from "express";
import { offeredCourseController } from "./offeredCourse.controller";
import { offeredCourseValidation } from "./offeredCourse.validation";
import validateRequest from "../middleware/validateRequest";

const router=Router()
router.post('/create-offered-course',validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse)


export const offeredCourseRouter=router