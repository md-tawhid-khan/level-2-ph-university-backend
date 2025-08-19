import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router= Router();
router.post('/login', validateRequest(authValidation.loginValidationSchema),authController.loginUser)

router.post('/change-password',authTokenValidation(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student) , validateRequest(authValidation.changePasswordValidationSchema),authController.changePassword)

export const authRouters=router