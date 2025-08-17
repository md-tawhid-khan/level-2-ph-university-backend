import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router= Router();
router.post('/login', validateRequest(authValidation.loginValidationSchema),authController.loginUser)

export const authRouters=router