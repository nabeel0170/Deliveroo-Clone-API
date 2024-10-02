import { Router } from 'express';
import {
  loginUser,
  signUpUser,
  verifyEmail,
  requestResetPassword,
  resetPassword,
} from '../controllers/userController';

const router = Router();

router.post('/verifyEmail', verifyEmail);
router.post('/loginUser', loginUser);
router.post('/registerUser', signUpUser);
router.post('/requestResetUserPassword', requestResetPassword);
router.post('/resetUserPassword', resetPassword);

export default router;
