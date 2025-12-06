import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

const getAllbooking = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user as JwtPayload;
    let result;
    if (loggedInUser.role === "admin") {
      result = await BookingService.getAllbooking();
    } else {
      result = await BookingService.getBookingByCustomerId(
        loggedInUser.id as string
      );
    }

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.log(error?.message);
    return res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const bookingController = {
  createBooking,
  getAllbooking,
};
