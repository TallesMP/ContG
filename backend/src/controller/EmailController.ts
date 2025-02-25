import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";

export class EmailController {
  static async verifyEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await EmailService.sendVerificationCode(email);
      res.status(201).json({ message: "Código enviado" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }
}
