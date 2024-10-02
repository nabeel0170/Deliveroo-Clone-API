import { Router } from 'express';
import {
  getCategories,
  getitems,
  getRestaurantDetails,
} from '../controllers/restaurantController';

const router = Router();

router.get('/restaurantDetails', getRestaurantDetails);
router.get('/itemCategories', getCategories);
router.post('/items', getitems);

export default router;
