import { Router } from "express";
import { UserRoutes } from "../models/users/user.route";
import { authRoutes } from "../models/auth/aut.route";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/auth", authRoutes);

export default router;
