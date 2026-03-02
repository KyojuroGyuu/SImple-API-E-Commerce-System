import express from 'express';
import { registerUser, loginUser, updateUserBalance } from '../controller/users.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users', verifyToken, updateUserBalance);

export default router;