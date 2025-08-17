import { Router } from "express";
import { facultyController } from "./faculty.controller";


const router=Router()

router.get('/',facultyController.getAllFacultyFromDB)

export const facultyRouter=router