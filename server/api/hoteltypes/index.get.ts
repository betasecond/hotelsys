import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { roomTypes } from '~/server/db/schema';

export default defineEventHandler(async () => {
  try {
    const allRoomTypes = await db.select({
      TypeID: roomTypes.id,
      TypeName: roomTypes.typeName,
      StarRating: roomTypes.starRating,
    }).from(roomTypes);
    
    return allRoomTypes;
  } catch (error) {
    console.error('Error fetching hotel types:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch hotel types',
    });
  }
}); 