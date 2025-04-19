import client from "../db/connection";
export class CategoryRepository {
  static async getCategories(user_id: number) {
    const query = `
    SELECT category_id, name, total_value FROM categories
    WHERE user_id = $1`;
    try {
      return (await client.query(query, [user_id])).rows;
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível buscar categoria" };
    }
  }

  static async getCategory(category_id: number) {
    const query = `
    SELECT * FROM categories
    WHERE category_id = $1`;
    try {
      return (await client.query(query, [category_id])).rows[0];
    } catch (error: any) {
      throw { status: 409, message: "Não foi possível buscar categoria" };
    }
  }

  static async findCategory(user_id: number, name: string) {
    const query = `
    SELECT * FROM categories
    WHERE user_id = $1 AND name = $2`;
    try {
      const result = await client.query(query, [user_id, name]);
      return result.rowCount != 0;
    } catch (error: any) {
      console.log(error.message);
      throw { status: 409, message: "Não foi possivel buscar categoria" };
    }
  }
  static async insertCategory(user_id: number, name: string) {
    const query = `
    INSERT INTO categories (user_id, name)
    VALUES ($1, $2);`;
    try {
      await client.query(query, [user_id, name]);
    } catch (error: any) {
      console.log("Erro no Repository: " + error.message);
      throw { status: 409, message: "Não foi possivel criar categoria" };
    }
  }
  static async deleteCategory(user_id: number, name: string) {
    const query = `
    DELETE FROM categories 
    WHERE user_id = $1 AND name = $2`;
    try {
      await client.query(query, [user_id, name]);
      console.log("Categoria " + name + " apagada");
    } catch (error: any) {
      console.log("Erro no Repository: " + error.message);
      throw { status: 409, message: "Não foi possivel excluir categoria" };
    }
  }

  static async editCategory(user_id: number, name: string, newName: string) {
    const query = `
      UPDATE categories 
      SET name = $1 
      WHERE name = $2 AND user_id = $3  
    `;

    try {
      console.log(newName, name, user_id);

      await client.query(query, [newName, name, user_id]);
      console.log("Categoria " + name + "editada");
    } catch (error: any) {
      console.log("Erro no Repository: " + error.message);
      throw { status: 409, message: "Não foi possivel editar  categoria" };
    }
  }
}
