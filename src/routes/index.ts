import { Router } from "express";
import { UserRoutes } from "../models/users/user.route";

const router = Router();

router.use("/auth", UserRoutes);

export default router;
