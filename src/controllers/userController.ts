import { Request, Response } from "express";
import { verifyLogin, verifyUserEmail } from "../services/userService";
import CryptoJS from "crypto-js";

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
  const { email, encryptedPassword } = req.body;
  const secretEncryptionKey = "your-secret-key";
  const decryptedBytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    secretEncryptionKey,
  );
  const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
  try {
    const result = await verifyLogin(email, decryptedPassword);
    if (result === false) {
      res.status(200).json({
        message: "Invalid Credentials",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Successful login",
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
export const signUpUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: "Signup request successfull", body: req.body });
};
