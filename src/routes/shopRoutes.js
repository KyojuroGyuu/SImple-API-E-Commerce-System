import express from 'express';
import { newShop, addProduct, updateProducts, deleteProducts, getProducts } from '../controller/shop.js';
import { verifyToken, isSeller } from '../middleware/authentication.js';

const router = express.Router();

router.post('/shop', verifyToken, newShop);
router.post('/shop/product', verifyToken, isSeller, addProduct);
router.get('/shop/product', verifyToken,isSeller, getProducts);
router.patch('/shop/product/update/:id', verifyToken, isSeller, updateProducts);
router.delete('/shop/product/delete', verifyToken, isSeller, deleteProducts);

export default router;