import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { rooms, roomTypes } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  try {
    const allRooms = await db
      .select({
        RoomID: rooms.id,
        Type: roomTypes.typeName,
        Price: rooms.price,
        Feature: rooms.feature,
        AvailableCount: rooms.availableCount,
        TypeID: rooms.typeId,
      })
      .from(rooms)
      .leftJoin(roomTypes, eq(rooms.typeId, roomTypes.id));

    return allRooms;
  } catch (error) {
    console.error('Error fetching all rooms:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch all rooms',
    });
  }
}); 