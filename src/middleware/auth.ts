import { Request, Response, NextFunction } from "express";

export const authroizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["api-key"] as string;
  if (apiKey && apiKey === "your-secret-api-key") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
