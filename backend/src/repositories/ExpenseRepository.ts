
import client from "../db/connection";
export class ExpenseRepository {
  static async insertExpense(user_id: number, category_id: number, name: string, amount: number) {
    const query = `
      INSERT INTO expenses(user_id, category_id, name, amount)
      VALUES ($1, $2, $3, $4);
    `;
    try {
      await client.query(query, [user_id, category_id, name, amount]);
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível criar o gasto" };
    }
  }
  static async deleteExpense(user_id: number, category_id: number, name: string) {
    const query = `
      DELETE FROM expenses WHERE user_id = $1 AND category_id = $2 AND name = $3`;
    try {
      await client.query(query, [user_id, category_id, name]);
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível excluir o gasto" };
    }

  }
}


