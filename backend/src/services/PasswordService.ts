import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";

export class PasswordService {
  static async sendPasswordResetEmail(email: string) {
    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    const token = jwt.sign({ email }, process.env.JWT_KEY!, {
      expiresIn: "5m",
      algorithm: "HS256",
    });

    const resetLink = `http://localhost:48003/password?token=${token}`;
    const text = "Segue link para troca de senha: ";
    const subject = "Troca de senha.";

    await EmailService.sendEmai(email, text, subject, resetLink);
  }

  static async resetPassword(email: string, newPassword: string) {
    const hash = await bcrypt.hash(newPassword, 14);
    await UserRepository.editPassword(email, hash);
  }
}
