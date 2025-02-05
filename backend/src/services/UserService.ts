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
        res.status(400).json({ error: "Email invalido" });
        return;
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
      const id = await UserRepository.getId(email);
      const hash = await UserRepository.getHash(id);
      const result = await bcrypt.compare(password, hash);

      if (!result) {
        res.status(401).json({ error: "Senha invalida" });
        return;
      }
      const token = jwt.sign(id, process.env.JWT_KEY!);
      console.log("Deu bolo");

      res.status(200).json({ message: "Usuário válido", token });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao fazer login: " + error.message });
    }
  }

  static async editeUser(req: Request, res: Response) {
    try {
      const { password, newPassword } = req.body;
      if (!password || !newPassword) {
        res
          .status(400)
          .json({ error: "Senha antiga e nova são obrigatórias." });
        return;
      }

      const id = res.locals.UserToken;
      const hash = await UserRepository.getHash(id);

      const compared = await bcrypt.compare(password, hash);
      if (!compared) {
        res.status(401).json({ error: "Senha antiga incorreta." });
        return;
      }
      const newHash = await bcrypt.hash(newPassword, 12);
      await UserRepository.editPassword(newHash, id);
      res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao editar senha: " + error.message });
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
