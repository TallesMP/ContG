import { CategoryRepository } from "../repositories/CategoryRepository";
import { ExpenseRepository } from "../repositories/ExpenseRepository";

export class ExpenseService {
  static async createExpense(user_id: number, category_id: number, name: string, amount: number) {
    if (amount <= 0) {
      throw { status: 400, message: "Valor do gasto deve ser maior que zero" }
    }
    await CategoryRepository.getCategory(category_id)

    await ExpenseRepository.insertExpense(user_id, category_id, name, amount)
  }

  static async removeExpense(user_id: number, category_id: number, name: string) {
    await CategoryRepository.getCategory(category_id)

    await ExpenseRepository.deleteExpense(user_id, category_id, name)
  }

  static async editExpense(user_id: number, name: string, new_name: string, amount: number, category_id: number) {
    if (amount <= 0) {
      throw { status: 400, message: "Valor do gasto deve ser maior que zero" }
    }

    await CategoryRepository.getCategory(category_id)
    await ExpenseRepository.editExpense(user_id, name, new_name, amount, category_id)
  }

  static async getExpenses(user_id: number, category_id: number) {
    await CategoryRepository.getCategory(category_id)

    return await ExpenseRepository.getExpenses(user_id, category_id)
  }
}
