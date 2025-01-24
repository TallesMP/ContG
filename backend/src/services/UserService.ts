import { UserRepository } from "../repositories/UserRepository";
import { VerifyEmail } from "../auxiliaries";
import bcrypt from "bcrypt"

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    if (!(await VerifyEmail(email))) {
      return "Email Invalido";
    }
    const hash = await bcrypt.hash(password, 10)

    return await UserRepository.insertUser(name, email, hash);
  }
}
