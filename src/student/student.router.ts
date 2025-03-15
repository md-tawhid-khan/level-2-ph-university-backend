import { Router } from "express";
import { studentController } from "./student.controller";

const router=Router()

router.get('/all-students',studentController.getAllStudent)
router.get('/:studentId',studentController.getSingleStudent)

export const studentRouters=router ;