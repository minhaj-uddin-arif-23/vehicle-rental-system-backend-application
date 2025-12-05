import { pool } from "../../config/database";
import jwt from "jsonwebtoken";
import config from "../../config/env";
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

export const authService = {
  signin,
};
