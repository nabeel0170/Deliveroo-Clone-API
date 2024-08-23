import express from "express";
import restaurantRoutes from "./routes/restaurantRoutes";
import { authroizeRequest } from "./middleware/auth";
import cors from "cors";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "api-key"], // Allowed headers
  }),
);
// Use middleware
app.use(authroizeRequest); // Apply middleware to all routes
// Use routes
app.use("/api", restaurantRoutes); // Prefix routes with /api

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
