import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import path from 'node:path';

const client = createClient({
  url: `file:${path.join(process.cwd(), 'server/db/local.db')}`,
});

export const db = drizzle(client, { schema });
export * from './schema'; 