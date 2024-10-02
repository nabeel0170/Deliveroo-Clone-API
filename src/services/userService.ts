import { TokenObject, userModel } from '../models/userModel';

export const emailAndPassword: { email: string; password: string }[] = [
  { email: 'john.doe@example.com', password: 'password123' },
  { email: 'jane.smith@example.com', password: 'securePass456' },
  { email: 'alice.johnson@example.com', password: 'aliceSecure789' },
  { email: 'bob.brown@example.com', password: 'bobPassword101' },
  { email: 'omarr@gmail.com', password: 'charlieSecure202' },
  { email: 'hii@salt.com', password: 'okayPassword303' },
];

export const verifyUserEmail = async (email: string) => {
  const user = emailAndPassword.find((user) => user.email === email);
  if (user) {
    const result = {
      Email: email,
      success: true,
    };
    return result;
  } else {
    const result = {
      Email: email,
      success: false,
    };
    return result;
  }
};

export const verifyLogin = async (
  email: string,
  password: string,
  salt?: string,
) => {
  const userData = { email, password, salt };
  try {
    const response = await userModel.loginUser(userData);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error in loginUser service:', error);
    return false;
  }
};

export const signUpUserToDB = async (
  email: string,
  name: string,
  contactNumber: string,
  newPassword: string,
  salt: string,
) => {
  const password = newPassword;
  const userData = {
    name,
    email,
    contactNumber,
    password,
    salt,
  };
  try {
    const response: boolean = await userModel.saveUser(userData);
    if (response) {
      return true;
    }
  } catch {
    return false;
  }
};

export const saveUserResetPasswordToken = async (tokenObj: TokenObject) => {
  try {
    const response = await userModel.saveResetPasswordTokenToDb(tokenObj);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
