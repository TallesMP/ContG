import client from "../db/connection";
export class UserRepository {
  static async insertUser(name: string, email: string, hash: string) {
    const query = `
      INSERT INTO users (name, email,hash)
      VALUES ($1, $2, $3);
    `;

    try {
      await client.query(query, [name, email, hash]);
    } catch (error: any) {
      throw { status: 409, message: "Já existe um usuario com este email" };
    }
  }

  static async getId(email: string) {
    const query = `
      SELECT user_id FROM users WHERE email = $1
    `;

    const result = await client.query(query, [email]);
    if (result.rowCount == 0) {
      throw { status: 404, message: "Usuario não encontrado" };
    }
    return result.rows[0].user_id;
  }

  static async getHash(id: string) {
    const query = `
      SELECT hash FROM users WHERE user_id = $1
    `;
    const result = await client.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error("Hash não encontrado");
    }
    return result.rows[0].hash;
  }

  static async editPassword(email: string, hash: string) {
    const query = `
      UPDATE users SET hash = $1 WHERE email = $2
    `;

    const result = await client.query(query, [hash, email]);

    if (result.rowCount === 0) {
      throw { status: 404, message: "ID não encontrado" };
    }
  }

  static async deleteUser(id: string) {
    const query = `
      DELETE FROM users WHERE user_id = $1
    `;

    const result = await client.query(query, [id]);
    if (result.rowCount === 0) {
      throw { status: 404, message: "ID inválido" };
    }
  }
}
