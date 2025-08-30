import Invoice from '../models/Invoice.js';
import Inventory from '../models/Inventory.js';
import Customer from '../models/Customer.js';

/**
 * @desc    Create a new invoice
 * @route   POST /api/billing/invoices
 * @access  Private/Staff
 */
const createInvoice = async (req, res) => {
  const { customerId, items, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Invoice must have at least one item' });
  }

  try {
    let totalAmount = 0;

    // Use a session for transaction
    const session = await Invoice.startSession();
    session.startTransaction();

    try {
      // Process each item
      for (const item of items) {
        const product = await Inventory.findById(item.productId).session(session);
        if (!product || product.quantity < item.quantity) {
          throw new Error(`Not enough stock for ${product?.productName || 'product'}`);
        }

        // Decrease stock
        product.quantity -= item.quantity;
        await product.save({ session });

        // Calculate total amount (assuming item price is sent from client)
        totalAmount += item.price * item.quantity;
      }
      
      // Create a unique invoice number (e.g., INV-timestamp)
      const invoiceNumber = `INV-${Date.now()}`;

      const invoice = new Invoice({
        invoiceNumber,
        customerId,
        items,
        totalAmount,
        paymentMethod,
        staffId: req.user._id,
        storeId: req.user.storeId,
      });

      const createdInvoice = await invoice.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json(createdInvoice);

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error; // Rethrow to be caught by outer catch block
    }
  } catch (error) {
    res.status(400).json({ message: `Failed to create invoice: ${error.message}` });
  }
};

/**
 * @desc    Get all invoices for a store
 * @route   GET /api/billing/invoices
 * @access  Private/Admin
 */
const getInvoices = async (req, res) => {
  const invoices = await Invoice.find({ storeId: req.user.storeId })
    .populate('customerId', 'name phone')
    .populate('staffId', 'name');
  res.json(invoices);
};

export { createInvoice, getInvoices };