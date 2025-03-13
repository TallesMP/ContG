import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware de erro de validação
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array().map((err) => err.msg) });
    return;
  }

  next();
};
