import { EmailRepository } from "../repositories/EmailRepository";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  static async createUser(name: string, email: string, password: string, code: string) {
    if (!(await EmailRepository.compareVerificationCode(email, code))) {
      throw { status: 400, message: "Codigo inválido ou expirado" };
    }

    await EmailRepository.deleteUnverificatedUser(email)
    const hash = await bcrypt.hash(password, 14);
    await UserRepository.insertUser(name, email, hash);
  }

  static async loginUser(email: string, password: string) {
    const id = await UserRepository.getId(email);
    const hash = await UserRepository.getHash(id);
    const equal = await bcrypt.compare(password, hash);

    if (!equal) {
      throw { status: 401, message: "Senha inválida" };
    }

    // https://portswigger.net/web-security/jwt/algorithm-confusion
    // https://medium.com/@chanpreetkaur2005/jwt-algorithm-confusion-attack-71278e2dce0e
    return jwt.sign({ id }, process.env.JWT_KEY!, { algorithm: 'HS256' });
  }

  static async removeUser(id: string) {
    await UserRepository.deleteUser(id);
  }

  static async resetPassword(email: string, newPassword: string) {
    const hash = await bcrypt.hash(newPassword, 14);
    await UserRepository.editPassword(email, hash);
  }

  static async requestPasswordReset(email: string) {
    await UserRepository.getId(email);

    const token = jwt.sign({ email }, process.env.JWT_KEY!, {
      expiresIn: "5m",
      algorithm: "HS256",
    });

    await EmailService.sendEmail(
      email,
      "Segue link para troca de senha: ",
      "Troca de senha.",
      `http://localhost:48003/password?token=${token}`
    );
  }
}
