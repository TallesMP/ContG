import { CategoryRepository } from "../repositories/CategoryRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";

export class ExpenseService {
  static async createExpense(user_id: number, category_id: number, name: string, amount: number) {
    if (!(await CategoryRepository.getCategory(category_id))) {
      throw { status: 400, message: "Categoria não encontrada" };
    }
    await ExpenseRepository.insertExpense(user_id, category_id, name, amount)
  }

  static async removeExpense(user_id: number, category_id: number, name: string) {
    if (!(await CategoryRepository.getCategory(category_id))) {
      throw { status: 400, message: "Categoria não encontrada" };
    }
    await ExpenseRepository.deleteExpense(user_id, category_id, name)
  }

}
