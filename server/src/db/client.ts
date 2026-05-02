import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { Env } from "../config/env";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDB = (env: Env) => {
  if(!dbInstance) {
    const client = postgres(env.DATABASE_URL, {
      max: 1
    });

    dbInstance = drizzle(client);
  }

  return dbInstance;
}