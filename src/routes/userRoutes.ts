import { Router } from 'express';
import {
  loginUser,
  signUpUser,
  verifyEmail,
  requestResetPassword,
  resetPassword,
} from '../controllers/userController';
import { validateSchema } from '../middleware/reqBodyValidation';
import { emailSchema, loginSchema, signUpSchema } from '../schema/userSchema';
import { QuerySchema } from '../schema/PathAndQuerySchema';
import { validateQueryParamSchema } from '../middleware/queryParamsValidation';

const router = Router();

/**
 * @swagger
 * /api/user/verifyEmail:
 *   post:
 *     summary: Verify user's email
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully verified email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email verified successfully."
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */
router.post(
  '/verifyEmail',
  validateQueryParamSchema(QuerySchema),
  validateSchema(emailSchema),
  verifyEmail,
);

/**
 * @swagger
 * /api/user/loginUser:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               encryptedPassword:
 *                 type: string
 *                 example: "U2FsdGVkX19..."
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/loginUser', validateSchema(loginSchema), loginUser);

/**
 * @swagger
 * /api/user/registerUser:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               contactNumber:
 *                 type: string
 *                 example: "1234567890"
 *               newPassword:
 *                 type: string
 *                 example: "StrongPassword123"
 *               salt:
 *                 type: string
 *                 example: "randomSaltValue"
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful Signup"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Error occurred during registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server Error: [error details]"
 */
router.post('/registerUser', validateSchema(signUpSchema), signUpUser);

/**
 * @swagger
 * /api/user/requestResetUserPassword:
 *   post:
 *     summary: Request password reset for a user
 *     tags: [User]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Email sent successfully with reset token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Error occurred while generating reset token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The token cannot be created right now"
 */
router.post('/requestResetUserPassword', requestResetPassword);

router.post('/resetUserPassword', resetPassword);

export default router;
