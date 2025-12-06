import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/authVaryfiy";

const router = Router();
router.get("/", auth("admin"), userController.getAllUser);
router.put("/:userId", auth("admin", "customer"), userController.updateUser);
router.delete("/:userId", auth("admin"), userController.deletUser);

export const UserRoutes = router;
