import type { Database } from "../db/index";

export type Env = {
  DATABASE_URL: string;
  ENVIRONMENT: string;
};

export type Variables = {
  db: Database;
};