import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/authVaryfiy";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getAllbooking);

export const bookingsRouter = router;
