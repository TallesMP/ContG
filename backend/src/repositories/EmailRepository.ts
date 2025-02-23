import client from "../db/connection";
export class EmailRepository {
  static async insertCode(email: string): Promise<string> {
    const query = `
      INSERT INTO awaiting_verification (email, verification_code)
      VALUES ($1, $2);
    `;
    const code = Math.random().toFixed(6).split(".")[1]
    console.log("Codigo " + code + " Gerado para o email " + email)

    await client.query(query, [email, code]);
    return code
  }
  static async compareVerificationCode(email: string, code: string) {
    const query = `
      SELECT * FROM awaiting_verification WHERE email = $1 AND verification_code = $2`
    const result = await client.query(query, [email, code])
    return result.rowCount != 0
  }

  static async deleteUnverificatedUser(email: string) {
    const query = `
      DELETE FROM awaiting_verification WHERE email = $1`
    await client.query(query, [email])
  }
}


