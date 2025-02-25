import { Request, Response } from "express";
import { PasswordService } from "../services/PasswordService";

export class PasswordController {
  static async sendEmailForgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await PasswordService.sendPasswordResetEmail(email);
      res.status(200).json({ message: "Email enviado com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro ao enviar email" });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { newPassword } = req.body;
      const email = res.locals.UserToken.email;

      await PasswordService.resetPassword(email, newPassword);
      res.status(200).json({ message: "Senha trocada com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json(error.message || "Erro ao trocar senha");
    }
  }
}
