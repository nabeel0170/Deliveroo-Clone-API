import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  name: string;
}

const generateAccessToken = (userId: string, userName: string): string => {
  const secret = "your-secret-key";
  const options = { expiresIn: "1h" };
  const payload: JwtPayload = {
    id: userId,
    name: userName,
  };
  console.log(payload);
  return jwt.sign(payload, secret, options);
};

// const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   try {
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, "mySecretKey", (error, decoded) => {
//         if (error) {
//           return res.status(403).json({ message: "Token Invalid!" });
//         }
//         req.user = decoded as JwtPayload;
//         next();
//       });
//     } else {
//       res.status(401).json({ message: "You are not authenticated!" });
//     }
//   } catch (error) {
//     res
//       .status(401)
//       .json({ message: "Authentication failed", error: error.message });
//   }
// };

export {
  generateAccessToken,
  // verifyToken
};
