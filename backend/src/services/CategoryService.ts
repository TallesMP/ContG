import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryService {
  static async createCategory(user_id: number, name: string) {
    try {
      if (await CategoryRepository.findCategory(user_id, name)) {
        throw new Error("Categoria já existe");
      }
      await CategoryRepository.insertCategory(user_id, name);
      return true;
    } catch (error: any) {
      console.log(error.message);
      throw { status: 409, message: "Não foi possivel criar categoria" };
    }
  }

  static async getCategories(user_id: number) {
    try {
      return await CategoryRepository.getCategories(user_id);
    } catch (error: any) {
      throw { status: 409, message: "Categorias não encontradas" };
    }
  }

  static async getCategory(category_id: number) {
    try {
      return await CategoryRepository.getCategory(category_id);
    } catch (error: any) {
      throw { status: 409, message: "Categorias não encontradas" };
    }
  }

  static async removeCategory(user_id: number, name: string) {
    try {
      if (!(await CategoryRepository.findCategory(user_id, name))) {
        throw new Error("Categoria não existe");
      }
      await CategoryRepository.deleteCategory(user_id, name);
      return true;
    } catch (error: any) {
      console.log("Category Service: " + error.message);
      throw { status: 409, message: "Não foi possivel excluir categoria" };
    }
  }

  static async editCategory(user_id: number, name: string, newName: string) {
    try {
      if (!(await CategoryRepository.findCategory(user_id, name))) {
        throw new Error("Categoria não existe");
      }
      await CategoryRepository.editCategory(user_id, name, newName);
      return true;
    } catch (error: any) {
      console.log("Category Service" + error.message);
      throw { status: 409, message: "Não foi possivel editar a categoria" };
    }
  }
}
