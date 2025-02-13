import { UserRepository } from "../repositories/UserRepository";
import { VerifyEmail } from "../aux/auxiliaries";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    if (!(await VerifyEmail(email))) {
      throw { status: 400, message: "Email inválido" };
    }

    const hash = await bcrypt.hash(password, 14);
    await UserRepository.insertUser(name, email, hash);
  }

  static async loginUser(email: string, password: string) {
    const id = await UserRepository.getId(email);
    const hash = await UserRepository.getHash(id);
    const result = await bcrypt.compare(password, hash);

    if (!result) {
      throw { status: 401, message: "Senha inválida" };
    }

    // https://portswigger.net/web-security/jwt/algorithm-confusion
    // https://medium.com/@chanpreetkaur2005/jwt-algorithm-confusion-attack-71278e2dce0e
    return jwt.sign({ id }, process.env.JWT_KEY!, { algorithm: 'HS256' });
  }

  static async editUser(password: string, newPassword: string, id: string) {
    const hash = await UserRepository.getHash(id);

    const compared = await bcrypt.compare(password, hash);
    if (!compared) {
      throw { status: 401, message: "Senha antiga incorreta" };
    }

    const newHash = await bcrypt.hash(newPassword, 14);
    await UserRepository.editPassword(newHash, id);
  }

  static async removeUser(id: string) {
    await UserRepository.deleteUser(id);
  }
}
