import { ExpenseService } from "../services/ExpenseService";
import { Request, Response } from "express";

export class ExpenseController {
  static async createExpense(req: Request, res: Response) {
    try {
      const { category_id, name, amount } = req.body;
      await ExpenseService.createExpense(res.locals.UserToken.id, category_id, name, amount)
      res.status(201).json({ message: "Gasto criada" })
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }
  static async removeExpense(req: Request, res: Response) {
    try {
      const { category_id, name } = req.body;
      await ExpenseService.removeExpense(res.locals.UserToken.id, category_id, name)
      res.status(201).json({ message: "Gasto removida" })
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }
  static async editExpense(req: Request, res: Response) {
    try {
      const { name, new_name, amount, category_id } = req.body;
      await ExpenseService.editExpense(res.locals.UserToken.id, name, new_name, amount, category_id)
      res.status(201).json({ message: "Gasto editado" })
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }
  static async getExpense(req: Request, res: Response) {
    try {
      const { category_id } = req.body;
      const expenses = await ExpenseService.getExpenses(res.locals.UserToken.id, category_id)
      res.status(201).json({ message: "Gasto retornado", expenses })
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }
}
