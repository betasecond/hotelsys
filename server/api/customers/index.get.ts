import { defineEventHandler, createError } from 'h3';
import { db } from '~/server/db';
import { customers } from '~/server/db/schema';

export default defineEventHandler(async () => {
  try {
    // Select specific fields to avoid exposing sensitive data like passwords
    const allCustomers = await db.select({
      CustomerID: customers.id,
      Name: customers.name,
      Contact: customers.contact,
      Gender: customers.gender,
      IDCard: customers.idCard,
    }).from(customers);
    
    return allCustomers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch customers',
    });
  }
}); 