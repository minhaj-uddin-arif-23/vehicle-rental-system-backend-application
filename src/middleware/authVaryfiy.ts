// check is token is validate or not using higher order function

import { NextFunction, Request, Response } from "express";
import config from "../config/env";
import jwt, { JwtPayload } from "jsonwebtoken";
const auth = async (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "you are unauthenticated",
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
          message: "forbidden",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message || "Not Validated",
      });
    }
  };
};
