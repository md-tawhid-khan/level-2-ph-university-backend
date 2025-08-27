import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import authTokenValidation from "../middleware/authMidleware";
import { USER_ROLE } from "../user/user.constant";

const router= Router();
router.post('/login', validateRequest(authValidation.loginValidationSchema),authController.loginUser)

router.post('/change-password',authTokenValidation(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student) , validateRequest(authValidation.changePasswordValidationSchema),authController.changePassword)

router.post('/refresh-token',validateRequest(authValidation.refreshTokenValidationSchema),authController.refreshToken)

router.post('/forget-password',validateRequest(authValidation.forgetPasswordValidationSchema),authController.forgetPassword)

router.post('/reset-password',validateRequest(authValidation.resetPasswordValidationSchema),authController.resetPassword)

export const authRouters=router
