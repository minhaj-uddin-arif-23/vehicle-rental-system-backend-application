import { pool } from "../../config/database";
const getAllUser = async () => {
  const result = await pool.query(
    `SELECT id, name,email,phone,role FROM users`
  );
  return result;
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, phone, role } = payload;

  // customer update

  let query = `
  UPDATE users SET name=$1, email=$2, phone=$3
  where id=$4 RETURNING name , email, phone, role`;
  let values = [name, email, phone, id];
  // only admin update role
  if (role) {
    (query = `
    UPDATE users SET name=$1, email=$2, phone=$3, role=$4 where id=$5
     RETURNING name , email, phone, role`),
      (values = [name, email, phone, role, id]);
  }
  return await pool.query(query, values);
};
//todo   no active bookings exist
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const userService = {
  getAllUser,
  updateUser,
  deleteUser,
};
