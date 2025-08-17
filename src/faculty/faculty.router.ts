import { Router } from "express";
import { facultyController } from "./faculty.controller";


const router=Router()

router.get('/',facultyController.getAllFacultyFromDB)

router.get('/:id',facultyController.getSingleFacultyFromDB)

export const facultyRouter=router