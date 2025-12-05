import { pool } from "../../config/database";

const addVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
      INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
      VALUES($1,$2,$3,$4,$5) RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehicle = async () => {
  const result = await pool.query(`
    SELECT id, vehicle_name, type, registration_number,  daily_rent_price, availability_status FROM vehicles 
    `);
  return result;
};
const singleVehicle = async (id: string) => {
  const singleVehicleId = await pool.query(
    `SELECT * FROM vehicles where id=$1`,
    [id]
  );
  return singleVehicleId;
};

const singleVehicleUpdate = async (
  payload: Record<string, unknown>,
  id: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const vehiclUpdate = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1,
    type=$2,registration_number=$3,
    daily_rent_price=$4,
    availability_status=$5 WHERE id=$6 RETURNING*`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return vehiclUpdate;
};

const deleteSingleVehicle = async (id: string) => {
  const deleteVehicle = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [
    id,
  ]);
  return deleteVehicle;
};
export const vehicleService = {
  addVehicle,
  getAllVehicle,
  singleVehicle,
  singleVehicleUpdate,
  deleteSingleVehicle,
};
