import { UserRepository } from "../repositories/UserRepository";
import { VerifyEmail } from "../aux/auxiliaries";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserService {
  static async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!(await VerifyEmail(data.email))) {
        throw new Error("Email invalido");
      }

      const hash = await bcrypt.hash(data.password, 12);
      await UserRepository.insertUser(data.name, data.email, hash);
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Erro ao criar usuário: " + error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.getUser(email);
      const result = await bcrypt.compare(password, user.hash);

      if (!result) {
        throw new Error("Senha invalida");
      }
      const token = jwt.sign(user.user_id, process.env.JWT_KEY!);

      res.status(200).json({ message: "Usuário válido", token });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao fazer login: " + error.message });
    }
  }

  static async removeUser(req: Request, res: Response) {
    try {
      await UserRepository.deleteUser(res.locals.UserToken);
      res.status(201).json({ message: "Usuario excluido com sucesso" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Erro ao excluir usuario: " + error.message });
    }
  }
}
