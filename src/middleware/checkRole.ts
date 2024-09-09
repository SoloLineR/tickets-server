import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DataStoredInToken } from "../types/types.js";
export default function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as DataStoredInToken;

  if (user.roleid == 2) {
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: "not admin" });
  }
}
