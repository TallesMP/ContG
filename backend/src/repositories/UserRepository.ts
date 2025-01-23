
import client from '../db/connection';

export class UserRepository {
  static async insertUser(name: string, email: string, hash: string, salt: string) {
    const query = `
      INSERT INTO usuario (nome, email, senha_hash, senha_salt)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    try {
      const result = await client.query(query, [name, email, hash, salt]);

      return { result: result };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}
