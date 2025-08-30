import express from 'express';
const router = express.Router();
import { getSalesReport, getProfitLossSummary } from '../controllers/reportController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

router.get('/sales', protect, adminOnly, getSalesReport);
router.get('/profit-loss', protect, adminOnly, getProfitLossSummary);

export default router;