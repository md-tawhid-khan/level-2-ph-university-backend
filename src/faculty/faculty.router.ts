
import { Router } from "express";
import { facultyController } from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";
import validateRequest from "../middleware/validateRequest";
import authTokenValidation from "../middleware/authMidleware";


const router=Router()

router.get('/',authTokenValidation(), facultyController.getAllFacultyFromDB)

router.get('/:id',facultyController.getSingleFacultyFromDB)

router.patch('/update/:facultyId',validateRequest(facultyValidation.updateFacultyValidationSchema),facultyController.updateFacultyIntoDB)

router.delete('/delete/:facultyId',facultyController.deleteFacultyIntoDB)

export const facultyRouter=router