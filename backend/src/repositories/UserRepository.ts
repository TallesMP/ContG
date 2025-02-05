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

  static async getId(email: string) {
    const query = `
      SELECT user_id FROM users WHERE email = $1
    `;

    const id = await client.query(query, [email]);
    if (id.rowCount == 0) {
      throw new Error("Email incorreto");
    }
    return id.rows[0].user_id;
  }

  static async getHash(id: string) {
    const query = `
      SELECT hash FROM users WHERE user_id = $1
    `;
    const hash = await client.query(query, [id]);
    if (hash.rowCount === 0) {
      throw new Error("Hash não encontrado");
    }
    return hash.rows[0].hash;
  }

  static async editPassword(hash: string, id: string) {
    const query = `
      UPDATE users SET hash = $1 WHERE user_id = $2
    `;

    try {
      await client.query(query, [hash, id]);
    } catch (error: any) {
      throw new Error("ID não encontrado");
    }
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
