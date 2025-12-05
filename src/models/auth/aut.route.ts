import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/authVaryfiy";
import { ROLE } from "../../types/role";

const router = Router();
router.post("/signin", authController.login);

export const authRoutes = router;
