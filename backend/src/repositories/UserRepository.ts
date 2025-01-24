
import client from '../db/connection';

export class UserRepository {
  static async insertUser(name: string, email: string, hash: string) {
    const query = `
      INSERT INTO users (name, email,hash)
      VALUES ($1, $2, $3);
    `;

    try {
      await client.query(query, [name, email, hash]);

      return { result: "Usuario criado" };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}
