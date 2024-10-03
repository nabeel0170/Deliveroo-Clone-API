import { Router } from 'express';
import {
  getCategories,
  getitems,
  getRestaurantDetails,
} from '../controllers/restaurantController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API for restaurant operations
 */

/**
 * @swagger
 * /api/restaurant/restaurantDetails:
 *   get:
 *     summary: Get details of a restaurant
 *     tags: [Restaurants]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: object
 *                   properties:
 *                     itemImgSrc:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     restaurantName:
 *                       type: string
 *                       example: "Restaurant Name"
 *                     foodTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Italian"
 *                     distance:
 *                       type: number
 *                       example: 2.5
 *                     openTime:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       example: [10, 22]  # Represents open hours in 24-hour format
 *                     minOrderAmount:
 *                       type: number
 *                       example: 20.0
 *                     minDeliveryFee:
 *                       type: number
 *                       example: 5.0
 */
router.get('/restaurantDetails', getRestaurantDetails);

/**
 * @swagger
 * /api/restaurant/itemCategories:
 *   get:
 *     summary: Get item categories
 *     tags: [Restaurants]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved item categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Appetizers"
 */
router.get('/itemCategories', getCategories);

/**
 * @swagger
 * /api/restaurant/items:
 *   post:
 *     summary: Get items based on certain count
 *     tags: [Restaurants]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 2

 *     responses:
 *       200:
 *         description: Successfully retrieved items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 101
 *                   name:
 *                     type: string
 *                     example: "Item Name"
 *                   price:
 *                     type: number
 *                     example: 9.99
 */
router.post('/items', getitems);

export default router;
