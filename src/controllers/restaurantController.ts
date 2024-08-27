import { Request, Response } from "express";
import { getRestaurantDetailsService } from "../services/restaurantService";

export const getRestaurantDetails = async (req: Request, res: Response) => {
  if (req) {
    try {
      const response = await getRestaurantDetailsService();
      const data = await response;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Cannot fetch data right now",
        error: (error as Error).message,
      });
    }
  }
};
export const getCategories = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "categories" });
};
export const getitems = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "items" });
};
