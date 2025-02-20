import client from "../db/connection";
export class EmailRepository {
  static async insertCode(email: string): Promise<string> {
    const query = `
      INSERT INTO awaiting_verification (email, verification_code)
      VALUES ($1, $2);
    `;
    const code = Math.random().toPrecision(6).split(".")[1]

    await client.query(query, [email, code]);
    return code
  }

  static async compareVerificationCode(email: string, code: string) {
    const query = `
      SELECT * FROM awaiting_verification WHERE email = $1 AND verification_code = $2`
    const result = await client.query(query, [email, code])
    return result.rows[0]
  }
}


