import { defineEventHandler, readBody, createError } from 'h3';
import { userLoginLogic } from './user/_logic';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await userLoginLogic(body);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
}); 