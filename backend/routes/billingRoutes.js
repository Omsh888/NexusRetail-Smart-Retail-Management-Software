import express from 'express';
const router = express.Router();
import { createInvoice, getInvoices } from '../controllers/billingController.js';
import { protect, staffOnly, adminOnly } from '../middleware/authMiddleware.js';

router.route('/invoices')
  .post(protect, staffOnly, createInvoice)
  .get(protect, adminOnly, getInvoices);

export default router;