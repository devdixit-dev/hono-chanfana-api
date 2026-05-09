import { Hono } from "hono";
import { fromHono } from "chanfana";
import { createDb } from "./db";
import { ListUsers, CreateUser } from "./routes/user";
import type { Env, Variables } from "./types/env";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Middleware: attach DB to context
app.use("*", async (c, next) => {
  const db = createDb(c.env.DATABASE_URL);
  c.set("db", db);
  await next();
});

// Setup OpenAPI with chanfana
const openapi = fromHono(app, {
  docs_url: "/docs",
  openapi_url: "/openapi.json",
  schema: {
    info: {
      title: "My Backend API",
      version: "1.0.0",
    },
  },
});

// Register routes
openapi.get("/api/users", ListUsers);
openapi.post("/api/users", CreateUser);

export default app;