import { Router } from "express";
import { UserRoutes } from "../models/users/user.route";
import { authRoutes } from "../models/auth/aut.route";
import { vehicleRoutes } from "../models/vehicles/vehicle.route";
import { bookingsRouter } from "../models/bookings/booking.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/auth", authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/bookings", bookingsRouter);
export default router;
