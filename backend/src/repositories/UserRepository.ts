
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

  static async getHash(email: string) {
    const query = `
      SELECT hash FROM users WHERE email = $1
    `;

    const hash = await client.query(query, [email]);
    if (hash.rowCount == 0) {
      throw new Error("Email incorreto");
    }
    return hash.rows[0].hash;

  }

  static async deleteUser(email: string) {
    const query = `
      DELETE FROM users WHERE email = $1
    `;
    try {
      await client.query(query, [email]);
      return { result: "Usuario excluido" };
    } catch (err: any) {
      return { error: err.message };
    }
  }
}
