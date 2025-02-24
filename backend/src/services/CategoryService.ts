import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryService {
  static async createCategory(user_id: number, name: string) {
    try {
      if (await CategoryRepository.findCategory(user_id, name)) {
        throw new Error("Categoria já existe")
      }
      await CategoryRepository.insertCategory(user_id, name)
      return true
    } catch (error: any) {
      console.log(error.message)
      throw { status: 409, message: "Não foi possivel criar categoria" };
    }
  }

  static async removeCategory(user_id: number, name: string) {
    try {
      if (!(await CategoryRepository.findCategory(user_id, name))) {
        throw new Error("Categoria não existe")
      }
      await CategoryRepository.deleteCategory(user_id, name)
      return true
    } catch (error: any) {
      console.log("Categorty Service: " + error.message)
      throw { status: 409, message: "Não foi possivel excluir categoria" }
    }
  }
}
