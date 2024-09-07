import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export default function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user: any) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (user?.roleId !== 2) {
        res.status(403).json({ message: "Access denied" });
      }
    }
  );

  next();
}
