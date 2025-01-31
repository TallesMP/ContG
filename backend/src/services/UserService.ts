import { UserRepository } from "../repositories/UserRepository";
import { VerifyEmail } from "../auxiliaries";
import bcrypt from "bcrypt"

interface User {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  static async createUser(data: User) {
    if (!(await VerifyEmail(data.email))) {
      return "Email Invalido";
    }
    const hash = await bcrypt.hash(data.password, 12)

    return await UserRepository.insertUser(data.name, data.email, hash);
  }

  static async compareHash(data: { email: string, password: string }) {
    const hash = await UserRepository.getHash(data.email);
    bcrypt.compare(data.password, hash, (err, result) => {
      if (err) {
        throw new Error("Senha invalida:" + err)
      }
      console.log(result)
      return result
    })

  }
}
