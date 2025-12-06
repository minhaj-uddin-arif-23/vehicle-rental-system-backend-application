import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "failed all user data",
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user;
    const { userId } = req.params; // 1
    //  customer update only own profile

    if (
      (loggedInUser as JwtPayload).role === "customer" &&
      String((loggedInUser as JwtPayload).id) !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can not update other user details",
      });
    }
    // preven role update to customer
    if ((loggedInUser as JwtPayload).role !== "admin") {
      delete req.body.role;
    }

    if (isNaN(Number(userId))) {
      res.status(400).json({
        message: "please provide a valide user id",
      });
    }
    const singleUserUpdate = await userService.updateUser(
      req.body,
      userId as string
    );
    if (singleUserUpdate.rowCount === 0) {
      res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update user successfully",
      data: singleUserUpdate.rows[0],
    });
  } catch (error: any) {
    console.log(error?.message);
    res.status(400).json({
      success: false,
      message: "Not found user",
      error: error?.message,
    });
  }
};

export const userController = {
  getAllUser,
  updateUser,
};
