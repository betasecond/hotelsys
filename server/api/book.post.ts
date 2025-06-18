import { defineEventHandler, readBody, createError } from 'h3';
import { bookRoomLogic } from './book/_logic';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await bookRoomLogic(body);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
}); 