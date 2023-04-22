import config from "../config";
import db from "../database";
import Error from "../types/error.interface";
import { Order } from "../types/orders";

export class OrdersModel {
  //createOrder
  async createOrder(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const values = [order.user_id, order.status];
      const result = await connection.query(sql, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create order (${order.user_id}) : ${
          (error as Error).message
        }`
      );
    }
  }

  //getOrders
  async getOrders(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to get orders : ${(error as Error).message}`);
    }
  }

  //getOrder with order id as parameter
  async getOrder(id: string): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM orders WHERE id = $1";
      const result = await connection.query(sql, [id]);
      // check if order exist
      if (result.rowCount === 0) {
        throw new Error(`order with id ${id} not found`);
      }

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get order with id (${id}) : ${(error as Error).message}`
      );
    }
  }

  //deleteOrder
  async deleteOrder(id: string): Promise<Record<"id", string>> {
    try {
      const connection = await db.connect();
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING id ";
      const result = await connection.query(sql, [id]);
      // check oder id exist
      if (result.rowCount === 0) {
        throw new Error(`order with id ${id} not found`);
      }

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to delete order with id (${id}) : ${(error as Error).message}`
      );
    }
  }
}

export default OrdersModel;
