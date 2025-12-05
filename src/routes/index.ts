import { Router } from "express";
import { UserRoutes } from "../models/users/user.route";
import { authRoutes } from "../models/auth/aut.route";
import { vehicleRoutes } from "../models/vehicles/vehicle.route";
import auth from "../middleware/authVaryfiy";

const router = Router();

router.use("/users", auth("admin"), UserRoutes);
router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/", UserRoutes);
export default router;
