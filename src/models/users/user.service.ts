import { pool } from "../../config/database";

const creatUser = async (paload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = paload;
  try {
    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, phone, role)
      VALUES($1,$2,$3,$4,$5) RETURNING id, name,email,phone,role
      `,
      [name, email, password, phone, role]
    );
    return result;
  } catch (error: any) {
    console.log(error?.message);
    throw error;
  }
};

export const userService = {
  creatUser,
};
