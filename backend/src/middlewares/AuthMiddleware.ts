import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Acesso negado" });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY!, { algorithms: ['HS256'] });
    res.locals.UserToken = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

