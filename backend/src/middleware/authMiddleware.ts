// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => { 
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Нет токена" });
    return;  
  }

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    (req as any).userId = decoded.userId; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: "Неверный или просроченный токен" });
  }
};
