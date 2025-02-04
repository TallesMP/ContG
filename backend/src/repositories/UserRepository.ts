import client from "../db/connection";
export class UserRepository {
  static async insertUser(name: string, email: string, hash: string) {
    const query = `
      INSERT INTO users (name, email,hash)
      VALUES ($1, $2, $3);
    `;

    try {
      await client.query(query, [name, email, hash]);

      return { result: "Usuario criado" };
    } catch (error: any) {
      throw new Error("Email duplicado");
    }
  }

  static async getUser(email: string) {
    const query = `
      SELECT hash, user_id FROM users WHERE email = $1
    `;

    const hash = await client.query(query, [email]);
    if (hash.rowCount == 0) {
      throw new Error("Email incorreto");
    }
    return hash.rows[0];
  }

  static async deleteUser(id: string) {
    const query = `
      DELETE FROM users WHERE user_id = $1
    `;
    try {
      await client.query(query, [id]);
    } catch (error: any) {
      throw new Error(`Id invalido`);
    }
  }
}
