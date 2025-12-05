import { Router } from "express";
import { UserRoutes } from "../models/users/user.route";
import { authRoutes } from "../models/auth/aut.route";
import { vehicleRoutes } from "../models/vehicles/vehicle.route";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);

export default router;
