import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

const dbCache = new Map<string, Database>();

export function createDb(connectionString: string): Database {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to create a database connection");
  }

  const cached = dbCache.get(connectionString);
  if (cached) {
    return cached;
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client, { schema });

  dbCache.set(connectionString, db);
  return db;
}

export const database = createDb;