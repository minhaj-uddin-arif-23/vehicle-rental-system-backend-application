import { pool } from "../../config/database";
import jwt from "jsonwebtoken";
import config from "../../config/env";
import bcrypt from "bcryptjs";
const signin = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Please provide valid email and password");
  }
  const result = await pool.query(
    `SELECT  id, name,email,phone,role FROM users WHERE email=$1 
    `,
    [email]
  );
  const user = result.rows[0];

  const token = jwt.sign(
    { email: email, password: password, role: user.role },
    config.json_secret as string,
    { expiresIn: "30d" }
  );

  console.log({ token: token });
  return { token, user };
};

const creatUser = async (paload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = paload;
  try {
    // hashed password
    const hashedPassword = await bcrypt.hash(password as string, 10);
    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, phone, role)
      VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role
      `,
      [name, email, hashedPassword, phone, role]
    );

    return result;
  } catch (error: any) {
    console.log(error?.message);
    throw error;
  }
};

export const authService = {
  signin,
  creatUser,
};
