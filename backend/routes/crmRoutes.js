import express from 'express';
const router = express.Router();
import { addCustomer, getCustomers, updateCustomer } from '../controllers/crmController.js';
import { protect, staffOnly } from '../middleware/authMiddleware.js';

router.route('/customers')
  .post(protect, staffOnly, addCustomer)
  .get(protect, staffOnly, getCustomers);

router.route('/customers/:id')
    .put(protect, staffOnly, updateCustomer);

export default router;