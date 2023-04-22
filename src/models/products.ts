import config from "../config";
import db from "../database";
import Error from "../types/error.interface";
import { Product } from "../types/product";

// steps :
// open connection with DB
// run query
// release connection
// return created user

export class ProductsModel {
  // createProduct

  async createProduct(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const values = [product.name, product.price, product.category];
      const result = await connection.query(sql, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create product (${product.name}) : ${
          (error as Error).message
        }`
      );
    }
  }

  // getProducts
  async getProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM products";

      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products : ${(error as Error).message}`);
    }
  }

  // getProduct with product id as parameter
  async getProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get product with id (${id}) : ${(error as Error).message}`
      );
    }
  }

  // updateProduct
  async updateProduct(id: string, product: Product) {
    const connection = await db.connect();
    const sql =
      "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";
    const values = [product.name, product.price, product.category, id];
    const result = await connection.query(sql, values);
    connection.release();
    return result.rows[0];
  }

  // deleteProduct

  // TODO: add typechecking for return type
  async deleteProduct(id: string) {
    try {
      const connection = await db.connect();
      const sql = "DELETE FROM products WHERE id = $1 RETURNING id ";
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to delete product with id (${id}) : ${(error as Error).message}`
      );
    }
  }
}

export default ProductsModel;
