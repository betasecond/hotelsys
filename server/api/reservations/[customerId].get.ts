import { defineEventHandler, getRouterParam } from 'h3';
import { db } from '~/server/db';
import { reservations } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const customerId = getRouterParam(event, 'customerId');

  if (!customerId) {
    return createError({
      statusCode: 400,
      statusMessage: 'Customer ID is required',
    });
  }

  try {
    const userReservations = await db
      .select({
        ReservationID: reservations.id,
        RoomID: reservations.roomId,
        CheckInTime: reservations.checkInTime,
        StayDays: reservations.stayDays,
      })
      .from(reservations)
      .where(eq(reservations.customerId, parseInt(customerId, 10)));
      
    return userReservations;
  } catch (error) {
    console.error(`Error fetching reservations for customer ${customerId}:`, error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch reservations',
    });
  }
}); 