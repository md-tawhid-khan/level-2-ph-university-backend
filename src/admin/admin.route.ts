import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../middleware/validateRequest";
import { adminValidation } from "./admin.validation";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router=Router()

router.get('',authTokenValidation(USER_ROLE.superAdmin), adminController.getAllAdminFromDB);
router.get('/:id',authTokenValidation(USER_ROLE.admin,USER_ROLE.superAdmin), adminController.getSingleAdminFromDB);
router.patch('/update/:adminId',authTokenValidation(USER_ROLE.superAdmin), validateRequest(adminValidation.updatedAdminValidation),adminController.updateAdminIntoDB);
router.delete('/delete/:adminId',authTokenValidation(USER_ROLE.superAdmin),adminController.deleteAdmin);

export const adminRouter=router