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
      res.status(200).json({ message: "Login feito com sucesso", token });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async editUser(req: Request, res: Response) {

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


}
