import db from "../database";

export class OrderProductsModel {
  async getOrderProducts() {
    try {
      const connection = await db.connect();
      const sqlQuery = "SELECT * FROM orders_products";
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get orderProducts: ${error}`);
    }
  }

  async getOrderProduct(id: string) {
    try {
      const connection = await db.connect();
      const sqlQuery = "SELECT * FROM orders_products WHERE id=$1";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get orderProduct: ${error}`);
    }
  }

  async createOrderProduct(orderProduct: any) {
    try {
      const connection = await db.connect();
      const sqlQuery =
        "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await connection.query(sqlQuery, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
      ]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create orderProduct: ${error}`);
    }
  }

  async deleteOrderProduct(id: string) {
    try {
      const connection = await db.connect();
      const sqlQuery = "DELETE FROM orders_products WHERE id=$1 RETURNING * ";
      const result = await connection.query(sqlQuery, [id]);
      // check if orderProduct exists
      if (!result.rows[0]) {
        throw new Error(`orderProduct with id ${id} does not exist`);
      }

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to delete orderProduct: ${error}`);
    }
  }

  // TODO: check this again
  async updateOrderProduct(id: string, orderProduct: any) {
    try {
      const connection = await db.connect();
      const sqlQuery =
        "UPDATE orders_products SET order_id=$1, product_id=$2, quantity=$3,  WHERE id=$4 RETURNING *";
      // array of values to be inserted into the query

      const values = [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity,
        id,
      ];

      const result = await connection.query(sqlQuery, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update orderProduct: ${error}`);
    }
  }
}

export default OrderProductsModel;
