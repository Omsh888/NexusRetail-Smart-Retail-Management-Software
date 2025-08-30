import express from 'express';
const router = express.Router();
import { registerUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

export default router;