import { Pool } from "pg";
import dotenv from "dotenv";
import config from "./env";
dotenv.config();
export const pool = new Pool({
  connectionString: config.connection_uri as string,
});
// 3 table -> [users], [vehicles], bookings
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
    ),
      await pool.query(
        ` 
        CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(50) NOT NULL,
            type VARCHAR(100) check(type IN('car','bike','van','SUV')),
            registration_number VARCHAR(100) UNIQUE NOT NULL,
            daily_rent_price INT NOT NULL check(daily_rent_price > 0),
            availability_status VARCHAR(50) check(availability_status IN('available','booked'))
        )
      `
      );
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE, 
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price INT NOT NULL check(total_price > 0),
        status VARCHAR(50) check(status IN('active','cancelled','returned')),
        check(rent_start_date < rent_end_date)
        )
        `
    );
    console.log("database table added");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
