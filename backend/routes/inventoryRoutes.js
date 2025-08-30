import express from 'express';
const router = express.Router();
import {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../controllers/inventoryController.js';
import { protect, adminOnly, staffOnly } from '../middleware/authMiddleware.js';

router.route('/')
  .get(protect, staffOnly, getInventoryItems)
  .post(protect, adminOnly, addInventoryItem);

router.route('/:id')
  .put(protect, adminOnly, updateInventoryItem)
  .delete(protect, adminOnly, deleteInventoryItem);

export default router;