import client from "../db/connection";
export class CategoryRepository {
  static async findCategory(user_id: number, name: string) {
    const query = `
    SELECT * FROM categories
    WHERE user_id = $1 AND name = $2`
    try {
      const result = await client.query(query, [user_id, name])
      return result.rowCount != 0
    } catch (error: any) {
      console.log(error.message)
      throw { status: 409, message: "Não foi possivel buscar categoria" };
    }
  }
  static async insertCategory(user_id: number, name: string) {
    const query = `
    INSERT INTO categories (user_id, name)
    VALUES ($1, $2);`
    try {
      await client.query(query, [user_id, name])
    } catch (error: any) {
      console.log("Erro no Repository: " + error.message)
      throw { status: 409, message: "Não foi possivel criar categoria" };
    }
  }
  static async deleteCategory(user_id: number, name: string) {
    const query = `
    DELETE FROM categories 
    WHERE user_id = $1 AND name = $2`
    try {
      await client.query(query, [user_id, name])
      console.log("Categoria " + name + " apagada")
    } catch (error: any) {
      throw { status: 409, message: "Não foi possivel excluir categoria" };
    }
  }
}


