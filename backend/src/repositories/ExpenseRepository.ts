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
      console.log(error)
      throw { status: 409, message: "Não foi possível criar o gasto" };
    }
  }
  static async deleteExpense(user_id: number, category_id: number, name: string) {
    const query = `
      DELETE FROM expenses 
      WHERE user_id = $1 AND category_id = $2 AND name = $3`;
    try {
      await client.query(query, [user_id, category_id, name]);
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível excluir o gasto" };
    }
  }
  static async editExpense(user_id: number, name: string, new_name: string, amount: number, category_id: number) {
    const query = `
      UPDATE expenses 
      SET name = $3, amount = $4, category_id = $5
      WHERE user_id = $1 AND name = $2`
    try {
      await client.query(query, [user_id, name, new_name, amount, category_id])
      console.log(user_id, name, new_name, amount, category_id)
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível alterar o gasto" };
    }
  }
}
