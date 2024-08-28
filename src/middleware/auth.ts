import { Request, Response, NextFunction } from "express";

const APIKEY = process.env.API_KEY;

export const authroizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(APIKEY);
  const apiKey = req.headers["api-key"] as string;
  if (apiKey && apiKey === APIKEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
