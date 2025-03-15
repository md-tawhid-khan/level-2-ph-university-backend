import { Router } from "express";
import { studentController } from "./student.controller";

const router=Router()

router.get('/all-students',studentController.getAllStudent)
router.get('/:studentId',studentController.getSingleStudent)
router.patch('/update/:studentId',studentController.updateStudent)
router.delete('/:studentId',studentController.deleteStudent)


export const studentRouters=router ;