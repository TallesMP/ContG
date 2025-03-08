import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories(
        res.locals.UserToken.id
      );

      res.status(201).json({ message: "Categorias retornadas", categories });
    } catch (error: any) {
      res

        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async getCategory(req: Request, res: Response) {
    try {
      const { category_id } = req.body;
      const categories = await CategoryService.getCategory(category_id);

      res.status(201).json({ message: "Categoria retornada", categories });
    } catch (error: any) {
      res

        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;

      await CategoryService.createCategory(res.locals.UserToken.id, name);
      res.status(201).json({ message: "Categoria criada" });
    } catch (error: any) {
      res

        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async removeCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await CategoryService.removeCategory(res.locals.UserToken.id, name);
      res.status(201).json({ message: "Categoria excluida" });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }

  static async editCategory(req: Request, res: Response) {
    try {
      const { name, newName } = req.body;
      await CategoryService.editCategory(
        res.locals.UserToken.id,
        name,
        newName
      );
      res.status(201).json({ message: "Categoria editada" });
    } catch (error: any) {
      res
        .status(error.static || 500)
        .json({ error: error.message || "Erro inesperado" });
    }
  }
}
