import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  gender: text('gender', { enum: ['male', 'female'] }).notNull(),
  contact: text('contact').notNull().unique(),
  idCard: text('id_card').notNull().unique(),
  password: text('password').notNull(),
});

export const roomTypes = sqliteTable('room_types', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  typeName: text('type_name').notNull(),
  starRating: integer('star_rating').notNull(),
});

export const rooms = sqliteTable('rooms', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  typeId: integer('type_id').notNull().references(() => roomTypes.id),
  price: real('price').notNull(),
  feature: text('feature'),
  availableCount: integer('available_count').notNull().default(0),
});

export const reservations = sqliteTable('reservations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerId: integer('customer_id').notNull().references(() => customers.id),
  roomId: integer('room_id').notNull().references(() => rooms.id),
  checkInTime: integer('check_in_time', { mode: 'timestamp' }).notNull(),
  stayDays: integer('stay_days').notNull(),
}); 