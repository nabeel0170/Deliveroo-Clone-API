import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  name: string;
}

const generateAccessToken = (userId: string, userName: string): string => {
  const secret = 'your-secret-key';
  const options = { expiresIn: '1h' };
  const payload: JwtPayload = {
    id: userId,
    name: userName,
  };
  console.log(payload);
  return jwt.sign(payload, secret, options);
};

export {
  generateAccessToken,
  // verifyToken
};
