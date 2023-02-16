import db from "../database";
import User from "../types/user";

class UserModel {
  async createUser(user: User) {
    try {
      const { email, user_name, first_name, last_name, password } = user;
      const connection = await db.connect();
      const sqlQuery =
        "INSERT INTO users (email, user_name, first_name, last_name, password, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING  id , email, user_name, first_name, last_name, created_at";
      const values = [
        email,
        user_name,
        first_name,
        last_name,
        password,
        new Date(),
      ];
      const result = await connection.query(sqlQuery, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable create user: ${error}`);
    }
  }

  // get a single user
  async getUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sqlQuery =
        "SELECT id , email, user_name, first_name, last_name, created_at FROM users WHERE id=($1)";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable get user: ${error}`);
    }
  }
  // get all users
  async getUsers(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sqlQuery =
        "SELECT id , email, user_name, first_name, last_name, created_at FROM users";
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable get users: ${error}`);
    }
  }

  // update a user
  async updateUser(id: string, user: User): Promise<User> {
    try {
      const { email, user_name, first_name, last_name, password } = user;
      const connection = await db.connect();
      const sqlQuery =
        "UPDATE users SET email=($1), user_name=($2), first_name=($3), last_name=($4), password=($5) WHERE id=($6) RETURNING id , email, user_name, first_name, last_name, created_at ";
      const values = [email, user_name, first_name, last_name, password, id];
      const result = await connection.query(sqlQuery, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable update user: ${error}`);
    }
  }

  // delete a user
  async deleteUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sqlQuery = "DELETE FROM users WHERE id=($1)";
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable delete user: ${error}`);
    }
  }

  // authenticate a user
}

export default UserModel;
