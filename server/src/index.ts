import { fromHono } from "chanfana";
import { Hono } from "hono";


// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/docs",
});

// Register OpenAPI endpoints
openapi.get("/", (c) => c.json({
	success: true,
	message: 'Hono Backend API'
}));

// Export the Hono app
export default app;
