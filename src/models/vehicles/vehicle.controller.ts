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

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicle();
    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicle found",
        data: result.rows,
      });
    }
    // console.log(result);
    return res.status(200).json({
      success: true,
      message: "Fetch all vehicle data",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Failed all vehicle data",
    });
  }
};

const singleVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params; // 1
    console.log(vehicleId);
    if (isNaN(Number(vehicleId))) {
      return res.status(400).json({
        message: "please provide a valide Vehicle id",
      });
    }
    const singleVehicle = await vehicleService.singleVehicle(
      vehicleId as string
    );
    if (singleVehicle.rowCount === 0) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: singleVehicle.rows[0],
    });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({
      success: false,
      message: "Not found any Vehicle",
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicle,
  singleVehicle,
};
