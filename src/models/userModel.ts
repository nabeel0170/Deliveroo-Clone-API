import mongoose from 'mongoose';
import { comparePasswords, hashPassword } from '../hash-helper';
import { generateAccessToken } from '../utils/jwtHelper';

const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { collection: 'user-data' },
);
const passwordResetSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { collection: 'user-password-reset-token-data' },
);

const userDataModel = mongoose.model('userData', user);
const userResetPasswordModel = mongoose.model(
  'userPasswordResetTokens',
  passwordResetSchema,
);
interface userDatatype {
  email: string;
  name?: string;
  contactNumber?: string;
  password: string;
  salt?: string;
}
export interface TokenObject {
  token: string;
  expiresAt: Date;
  email: string;
}
export const userModel = {
  saveUser: async (userData: userDatatype): Promise<boolean> => {
    const email: string = userData.email;
    try {
      const isEmailAvailable = await userDataModel.findOne({ email });
      if (isEmailAvailable) {
        return false;
      }
      const newUser = new userDataModel(userData);
      await newUser.save();
      console.log('User saved successfully.');

      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },
  loginUser: async (userData: userDatatype) => {
    try {
      const email = userData.email;
      const password = userData.password;

      const user = await userDataModel.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const salt = user.salt;
      const hashedPassword = user.password;

      if (!salt) {
        throw new Error('Salt is missing for the user');
      }

      const hashNewPassword = hashPassword(password, salt);

      const passwordMatch = comparePasswords(hashNewPassword, hashedPassword);

      if (passwordMatch === false) {
        return {
          success: false,
          message: 'Invalid Credentials',
        };
      }

      const id = user._id.toString();

      const name = user.name;
      const token = await generateAccessToken(id, name);
      return {
        success: true,
        userName: name,
        message: 'User logged in successfully',
        userId: id,
        token,
      };
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  },
  saveResetPasswordTokenToDb: async (tokenObj: TokenObject) => {
    try {
      const updatedToken = await userResetPasswordModel.findOneAndUpdate(
        { email: tokenObj.email },
        { $set: tokenObj },
        { upsert: true, new: true },
      );

      if (updatedToken) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  },
};
