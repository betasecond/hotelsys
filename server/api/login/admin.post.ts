import { defineEventHandler, readBody, createError } from 'h3';
import { adminLoginLogic } from './admin/_logic';


export default defineEventHandler(async (event) => {
  const { adminPassword } = useRuntimeConfig();
  try {
    const body = await readBody(event);
    return await adminLoginLogic(body, adminPassword);
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message,
    });
  }
}); 