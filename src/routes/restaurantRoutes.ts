import { Router } from "express";
import { getRestaurantDetails } from "../controllers/restaurantController";

const router = Router();

// Define route for /data
router.get("/restaurantDetails", getRestaurantDetails);

export default router;
