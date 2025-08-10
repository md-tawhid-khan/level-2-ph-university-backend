import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { facultyValidation } from "./faculty.validation";
import { facultyController } from "./faculty.controller";

const router=Router()

router.post('/create-faculty',validateRequest(facultyValidation.createFacultyValidationSchema),facultyController.createFacultyIntoDB)

export const facultyRouter=router