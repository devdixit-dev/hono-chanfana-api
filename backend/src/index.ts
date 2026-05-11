import { Hono } from "hono";
import { fromHono } from "chanfana";
import { createDb } from "./db";
import { ListUsers, CreateUser } from "./routes/user";
import type { Env, Variables } from "./types/env";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Setup OpenAPI with chanfana
const openapi = fromHono(app, {
  docs_url: "swagger-docs",
  openapi_url: "/openapi.json",
  schema: {
    info: {
      title: "My Backend API",
      version: "1.0.0",
    },
  },
});

app.get("/docs", (c) => {
  return c.html(`
    <!doctype html>
    <html>
      <head>
        <title>API Docs</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        <script>
          Scalar.createApiReference('#app', {
            url: '/openapi.json'
          })
        </script>
      </body>
    </html>
  `);
});

app.get("/", async (c: any) => {
  return c.json({
    success: true,
    message: "Hono Backend Running...",
  });
});

// Register routes
openapi.get("/api/users", ListUsers);
openapi.post("/api/users", CreateUser);

export default app;