import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { users } from "../db/schema";
import type { Database } from "../db";
import type { Context } from "hono";

export class ListUsers extends OpenAPIRoute {
  schema = {
    tags: ["Users"],
    summary: "List all users",
    responses: {
      "200": {
        description: "List of users",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              data: z.array(
                z.object({
                  id: z.number(),
                  name: z.string(),
                  email: z.string(),
                  createdAt: z.string().or(z.date()),
                })
              ),
            }),
          },
        },
      },
    },
  };

  async handle(c: Context) {
    const db: Database = c.get("db");
    const result = await db.select().from(users);
    return { success: true, data: result };
  }
}

export class CreateUser extends OpenAPIRoute {
  schema = {
    tags: ["Users"],
    summary: "Create a new user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string().min(1),
              email: z.string().email(),
            }),
          },
        },
      },
    },
    responses: {
      "201": {
        description: "User created",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              data: z.object({
                id: z.number(),
                name: z.string(),
                email: z.string(),
              }),
            }),
          },
        },
      },
    },
  };

  async handle(c: Context) {
    const db: Database = c.get("db");
    const body = await c.req.json();
    const [user] = await db.insert(users).values(body).returning();
    return c.json({ success: true, data: user }, 201);
  }
}