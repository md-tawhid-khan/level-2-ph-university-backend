import { Router } from "express";
import { adminController } from "./admin.controller";

const router=Router()

router.get('',adminController.getAllAdminFromDB)
router.get('/:id',adminController.getSingleAdminFromDB)

export const adminRouter=router