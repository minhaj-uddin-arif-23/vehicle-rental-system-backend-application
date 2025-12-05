import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { id, name, email, password, phone, role } = req.body;
  try {
    if (!name || !email || !password || !phone || !role) {
      res.status(400).json({
        message: "All Fields required ",
      });
    }
    const result = await userService.creatUser(req.body);
    console.log({ result: result });
    if (result.rowCount === 0) {
      return res.status(401).json({
        message: "User already exists",
      });
    }
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result?.rows[0],
    });
    //
    // console.log("insetUser -> ", insetUser.rows[0]);
  } catch (error: any) {
    console.log(error);
    if (error.code === "23505") {
      res.status(401).json({
        error: error.detail,
        message: "Another email Try, this account already exists.",
      });
    }
    res.status(401).json({
      success: false,
      message: "user not created successfully",
      error: error?.message,
    });
  }
};

// const getAllUser = async (req: Request, res: Response) => {
//   try {
//   } catch (error: any) {}
// };
export const userController = {
  createUser,
};
