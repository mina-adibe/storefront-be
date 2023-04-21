import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  BCRYPT_PASS,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_test,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
  saltRounds: SALT_ROUNDS, // salt  for bcrypt
  bcryptPass: BCRYPT_PASS, //  pepper for bcrypt
  tokenSecret: TOKEN_SECRET,
};
