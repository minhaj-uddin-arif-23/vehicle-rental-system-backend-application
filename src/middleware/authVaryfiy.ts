// check is token is validate or not using higher order function

import { NextFunction, Request, Response } from "express";
import config from "../config/env";
import jwt, { JwtPayload } from "jsonwebtoken";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({
          success: false,
          message:
            "you are unauthenticated.Please log in and permission to admin",
        });
      }
      // then verify
      const secret = config.json_secret;
      const tokenDecoded = jwt.verify(
        token as string,
        secret as string
      ) as JwtPayload;
      //  then set user this tokenDecoded
      req.user = tokenDecoded;
      if (roles.length > 0 && !roles.includes(tokenDecoded.role)) {
        res.status(403).json({
          success: false,
          message: "Only admin create a vehicle.",
        });
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || "Not Validated",
      });
    }
  };
};

export default auth;
