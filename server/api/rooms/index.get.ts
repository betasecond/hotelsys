import { defineEventHandler } from 'h3';
import { db } from '~/server/db';
import { rooms, roomTypes } from '~/server/db/schema';
import { eq, gt } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    const availableRooms = await db
      .select({
        RoomID: rooms.id,
        Type: roomTypes.typeName,
        Price: rooms.price,
        Feature: rooms.feature,
        AvailableCount: rooms.availableCount,
      })
      .from(rooms)
      .leftJoin(roomTypes, eq(rooms.typeId, roomTypes.id))
      .where(gt(rooms.availableCount, 0));

    return availableRooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch rooms',
    });
  }
}); 