import express from "express";
import hikingItemRoutes from "./routes/hikingItems.routes.js";

const app = express();

app.use(express.json());

app.use("/api/hiking-items", hikingItemRoutes);

export default app;