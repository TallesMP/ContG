import { UserRepository } from "../repositories/UserRepository";
import { VerifyEmail } from "../auxiliaries";

export class UserService {
  static async createUser(name: string, email: string, hash: string, salt: string) {

    if (!VerifyEmail(email)) {
      return ("Email Invalido")
    }
    return await UserRepository.insertUser(name, email, hash, salt);

  }
}
