import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../middleware/validateRequest";
import { adminValidation } from "./admin.validation";

const router=Router()

router.get('',adminController.getAllAdminFromDB);
router.get('/:id',adminController.getSingleAdminFromDB);
router.patch('/update/:adminId',validateRequest(adminValidation.updatedAdminValidation),adminController.updateAdminIntoDB);
router.delete('/delete/:adminId',adminController.deleteAdmin);

export const adminRouter=router