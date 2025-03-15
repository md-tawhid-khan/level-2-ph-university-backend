import { Router } from "express";
import { studentController } from "./student.controller";

const router=Router()

router.get('/all-students',studentController.getAllStudent)

export const studentRouters=router ;