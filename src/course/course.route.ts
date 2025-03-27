import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { courseController } from "./course.controller";
import { courseValidation } from "./course.validation";

const router=Router()

router.post('/create-course',validateRequest(courseValidation.courseSchemaValidation),courseController.createCourseIntoDB)
router.get('/',courseController.getAllCourseFromDB)
router.get('/:courseId',courseController.getSingleCourseFromDB)
router.delete('/:courseId',courseController.deleteSingleCourseFromDB)
router.patch('/:courseId',validateRequest(courseValidation.updateCourseSchemaValidation), courseController.updateCourseIntoDB)

export const courseRouter=router ;