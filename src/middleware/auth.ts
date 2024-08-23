import { Request, Response, NextFunction } from "express";

// Middleware function to verify requests
export const authroizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Example: Check for an API key in the request headers
  const apiKey = req.headers["api-key"] as string;

  if (apiKey && apiKey === "your-secret-api-key") {
    next(); // API key is valid, proceed to the next middleware or route
  } else {
    res.status(401).json({ message: "Unauthorized" }); // API key is invalid, send unauthorized response
  }
};
