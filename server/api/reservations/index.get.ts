import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { reservations, customers } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    const allReservations = await db
      .select({
        ReservationID: reservations.id,
        Name: customers.name,
        RoomID: reservations.roomId,
        CheckInTime: reservations.checkInTime,
        StayDays: reservations.stayDays,
      })
      .from(reservations)
      .leftJoin(customers, eq(reservations.customerId, customers.id));

    return allReservations;
  } catch (error) {
    console.error('Error fetching all reservations:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch all reservations',
    });
  }
}); 