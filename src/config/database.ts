import { Pool } from "pg";
import dotenv from "dotenv";
import config from "./env";
dotenv.config();
export const pool = new Pool({
  connectionString: config.connection_uri as string,
});
// 3 table -> users, vehicles, bookings
export const initalizeDatabase = async () => {
  try {
    await pool.query(
      `  CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(50) UNIQUE NOT NULL check(email = LOWER(email)),
          password text NOT NULL check(LENGTH(password) >= 6),
          phone VARCHAR(50) NOT NULL,
          role VARCHAR(50) check(role IN('admin','customer'))
        )
      `
    );
    console.log("database table added");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
