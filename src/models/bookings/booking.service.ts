import { pool } from "../../config/database";

interface CreateBookingPayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: CreateBookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  // check vehicle availability
  const vehicleResult = await pool.query(
    `SELECT id ,vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }
  const vehicle = vehicleResult.rows[0];
  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for bookings");
  }
  // calculate rental days
  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  const diffTime = endDate.getTime() - startDate.getTime();
  const days = diffTime / (1000 * 60 * 60 * 24);
  if (days <= 0) {
    throw new Error("Invalid rent dates");
  }
  // calculate total price
  const total_price = days * vehicle.daily_rent_price;

  // create booking

  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status)
    VALUES($1,$2,$3,$4,$5,'active') RETURNING *
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  // UPDATE VEHICLE STATUS TO BOOKED
  await pool.query(
    `
    UPDATE vehicles SET availability_status='booked' 
    
    WHERE id=$1
    `,
    [vehicle_id]
  );
  return {
    ...bookingResult.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getAllbooking = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};
const getBookingByCustomerId = async (customerId: string) => {
  return await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [
    customerId,
  ]);
};

const getBookingById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);
  return result.rows[0];
};
const updateBookingStatus = async (bookingId: string, status: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING*`,
    [status, bookingId]
  );
  return result.rows[0];
};
const updateVehicleAvailability = async (vehicleId: string, status: string) => {
  return await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2`,
    [status, vehicleId]
  );
};

export const BookingService = {
  createBooking,
  getAllbooking,
  getBookingByCustomerId,
  getBookingById,
  updateBookingStatus,
  updateVehicleAvailability,
};
