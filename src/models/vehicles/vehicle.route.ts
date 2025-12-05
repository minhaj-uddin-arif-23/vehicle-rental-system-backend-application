import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/authVaryfiy";

const router = Router();
//  middleaware add admin
router.post("/", auth("admin"), vehicleController.createVehicle);
router.get("/", vehicleController.getVehicle);
router.get("/:vehicleId", vehicleController.singleVehicle);
router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;
