import express from 'express';
import { newOrder } from '../controller/order.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

router.post('/orders', verifyToken, newOrder);

export default router;