import { Router } from "express";
import { offeredCourseController } from "./offeredCourse.controller";
import { offeredCourseValidation } from "./offeredCourse.validation";
import validateRequest from "../middleware/validateRequest";

const router=Router()
router.post('/create-offered-course',validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse)

router.get('/',offeredCourseController.getAllOfferedCourseFromDB)
router.get('/:id',offeredCourseController.getSingleOfferedCourseFromDB)

router.patch('/:id', validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),offeredCourseController.updateOfferedCourseController)

router.delete('/:id',offeredCourseController.deleteSpecificOfferedCourseFromDB)

export const offeredCourseRouter=router