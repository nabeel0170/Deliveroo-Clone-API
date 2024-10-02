import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import {
  verifyLogin,
  verifyUserEmail,
  signUpUserToDB,
  saveUserResetPasswordToken,
} from '../services/userService';
import { sendEmail } from '../utils/resetEmailHelper';

export const verifyEmail = async (req: Request, res: Response) => {
  if (req) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    try {
      const result = await verifyUserEmail(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Cannot fetch data right now',
        error: (error as Error).message,
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, encryptedPassword } = req.body;
  const secretEncryptionKey = 'your-secret-key';
  const decryptedPassword = CryptoJS.AES.decrypt(
    encryptedPassword,
    secretEncryptionKey,
  ).toString(CryptoJS.enc.Utf8);

  try {
    const result = await verifyLogin(email, decryptedPassword);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const signUpUser = async (req: Request, res: Response) => {
  const { email, NewPassword, name, contactNumber, salt } = req.body;
  try {
    const response = await signUpUserToDB(
      email,
      name,
      contactNumber,
      NewPassword,
      salt,
    );

    if (response) {
      res.status(200).json({
        message: 'Successful Signup',
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Server Error:', error });
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const expiryTime = await new Date();

    await expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    const tokenObj = { token, expiresAt: expiryTime, email };
    const saveTokenResponse = await saveUserResetPasswordToken(tokenObj);
    if (saveTokenResponse) {
      const response = await sendEmail(email, token, expiryTime);
      if (response) {
        res
          .status(200)
          .json({ message: 'Email sent succesfully', success: true });
      }
    } else {
      res
        .status(400)
        .json({ message: 'The token cannot be created right now' });
    }

    // send the email with the token
    //return the response
  } catch (error) {
    res.status(400).json({ message: 'Server Error:', error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  // const { email,token,newPassword} = req.body;
  try {
    //verify the token
    //if true save the password and return a response
  } catch (error) {
    res.status(400).json({ message: 'Server Error:', error });
  }
};
