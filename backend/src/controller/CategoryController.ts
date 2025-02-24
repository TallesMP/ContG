import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await CategoryService.createCategory(res.locals.UserToken.id, name)
      res.status(201).json({ message: "Categoria criada" })
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }
  static async removeCategory(req: Request, res: Response) {
    try {
      const [name] = req.body;
      await CategoryService.removeCategory(res.locals.UserToken.id, name)
      res.status(201).json({ message: "Categoria excluida" })
    }
    catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" })
    }
  }

}
