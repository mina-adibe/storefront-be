import config from "../config";
import db from "../database";
import Error from "../types/error.interface";
import User from "../types/user";
import bcrypt from "bcrypt";

// steps :
// open connection with DB
// run query
// release connection
// return created user

// create a hash password function
const hashPassword = (password: string) => {
  const salt = parseInt(config.saltRounds as string, 10);

  return bcrypt.hashSync(`${password}${config.bcryptPass}`, salt);
};

// create compare password function

const comparePassword = (password: string, hashPassword: string): boolean => {
  return bcrypt.compareSync(`${password}${config.bcryptPass}`, hashPassword);
};

class UserModel {
  async createUser(user: User): Promise<User> {
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
        hashPassword(password),
        new Date(),
      ];
      const result = await connection.query(sqlQuery, values);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable create  (${user.user_name}) : ${(error as Error).message}`
      );
    }
  }

  // get a single user
  async getUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sqlQuery =
        "SELECT id , email, user_name, first_name, last_name, created_at FROM users WHERE id=($1)";
      const result = await connection.query(sqlQuery, [id]);
      // check if user exist

      if (result.rowCount === 0) {
        throw new Error(`user with id ${id} not found`);
      }

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
      const values = [
        email,
        user_name,
        first_name,
        last_name,
        hashPassword(password),
        id,
      ];
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
  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sqlQuery = "SELECT password FROM users WHERE email=($1)";
      const result = await connection.query(sqlQuery, [email]);
      if (result.rows.length) {
        const user: User = result.rows[0];
        const isPasswordValid = comparePassword(password, user.password);

        if (isPasswordValid) {
          const user = await connection.query(
            "SELECT id , email, user_name, first_name, last_name, created_at FROM users WHERE email=($1)",
            [email]
          );
          return user.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(
        `unable authenticate user: ${(error as Error).message as string}`
      );
    }
  }
}

export default UserModel;
