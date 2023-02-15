import { Pool } from "pg";
import config from "../config";

// TODO : use Number or parseInt
const pool = new Pool({
  port: parseInt(config.dbPort as string, 10),
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
});

export default pool;
