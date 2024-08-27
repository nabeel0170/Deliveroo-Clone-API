import { Request, Response } from "express";
import { verifyUserEmail } from "../services/userSevice";

export const verifyEmail = async (req: Request, res: Response) => {
  if (req) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    try {
      const result = await verifyUserEmail(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Cannot fetch data right now",
        error: (error as Error).message,
      });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Login request successfull", body: req.body });
};
export const signUpUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Signup request successfull", body: req.body });
};
