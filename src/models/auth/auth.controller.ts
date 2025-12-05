import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.signin(email, password);
    res.status(201).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Login failed",
      error: error?.message,
    });
  }
};

export const authController = { login };
