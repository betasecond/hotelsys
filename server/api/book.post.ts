import { defineEventHandler, readBody, createError } from 'h3';
import { db, rooms, reservations } from '~/server/db';
import { eq, gt, and, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { customerId, roomId, checkInTime, stayDays } = body;

  if (!customerId || !roomId || !checkInTime || !stayDays) {
    return createError({ statusCode: 400, statusMessage: '请填写完整信息' });
  }

  try {
    const result = await db.transaction(async (tx) => {
      // 1. Check for availability and get the room
      const room = await tx.query.rooms.findFirst({
        where: and(eq(rooms.id, roomId), gt(rooms.availableCount, 0)),
        columns: {
          id: true,
        }
      });

      if (!room) {
        // By throwing an error, we automatically roll back the transaction
        throw new Error('Room not available');
      }

      // 2. Decrement available count
      await tx.update(rooms)
        .set({ availableCount: sql`${rooms.availableCount} - 1` })
        .where(eq(rooms.id, roomId));

      // 3. Create reservation
      const newReservation = await tx.insert(reservations).values({
        customerId: parseInt(customerId, 10),
        roomId: parseInt(roomId, 10),
        checkInTime: new Date(checkInTime),
        stayDays: parseInt(stayDays, 10),
      }).returning({ id: reservations.id });
      
      return newReservation[0];
    });

    return {
      message: '预订成功！',
      reservationId: result.id,
    };
  } catch (error: any) {
    if (error.message === 'Room not available') {
      return createError({ statusCode: 409, statusMessage: '该房间已无可预订数量' });
    }
    console.error('Booking error:', error);
    return createError({ statusCode: 500, statusMessage: '预订失败，请稍后重试' });
  }
}); 