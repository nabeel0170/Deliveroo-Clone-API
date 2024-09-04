import { Router } from "express";
import {
  loginUser,
  signUpUser,
  verifyEmail,
} from "../controllers/userController";

const router = Router();

router.post("/verifyEmail", verifyEmail);
router.post("/loginUser", loginUser);
router.post("/registerUser", signUpUser);

export default router;
