import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, code } = req.body;
      await UserService.createUser(name, email, password, code);
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);
      res.status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: false, //LEMBRAR DE ALTERAR PARA TRUE DEPOIS DE CONFIGURAR HTTPS
          sameSite: 'strict'
        })
        .json({ message: "Login feito com sucesso" })

    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async removeUser(req: Request, res: Response) {
    try {
      const id = res.locals.UserToken.id;
      await UserService.removeUser(id);
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await UserService.requestPasswordReset(email);
      res.status(200).json({ message: "Email enviado com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro ao enviar email" });
    }
  }
  static async resetPassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const email = res.locals.UserToken.email;

      await UserService.resetPassword(email, password);
      res.status(200).json({ message: "Senha trocada com sucesso" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json(error.message || "Erro ao trocar senha");
    }
  }
}
