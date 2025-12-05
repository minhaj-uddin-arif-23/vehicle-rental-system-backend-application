import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.addVehicle(req.body);
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Failed to create Vehicle",
      error: error?.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
};
