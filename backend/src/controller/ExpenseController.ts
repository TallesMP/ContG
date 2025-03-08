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
}
