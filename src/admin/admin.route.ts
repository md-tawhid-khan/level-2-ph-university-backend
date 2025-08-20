import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../middleware/validateRequest";
import { adminValidation } from "./admin.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.get('',authTokenValidation(USER_ROLE.admin), adminController.getAllAdminFromDB);
router.get('/:id',adminController.getSingleAdminFromDB);
router.patch('/update/:adminId',validateRequest(adminValidation.updatedAdminValidation),adminController.updateAdminIntoDB);
router.delete('/delete/:adminId',adminController.deleteAdmin);

export const adminRouter=router