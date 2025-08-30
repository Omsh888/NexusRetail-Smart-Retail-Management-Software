import Inventory from '../models/Inventory.js';

/**
 * @desc    Get all inventory items
 * @route   GET /api/inventory
 * @access  Private/Staff
 */
const getInventoryItems = async (req, res) => {
  const items = await Inventory.find({ storeId: req.user.storeId });
  res.json(items);
};

/**
 * @desc    Add a new inventory item
 * @route   POST /api/inventory
 * @access  Private/Admin
 */
const addInventoryItem = async (req, res) => {
  const { productName, sku, quantity, price, category } = req.body;

  const itemExists = await Inventory.findOne({ sku, storeId: req.user.storeId });

  if (itemExists) {
    res.status(400).json({ message: 'Item with this SKU already exists' });
    return;
  }

  const item = new Inventory({
    productName,
    sku,
    quantity,
    price,
    category,
    storeId: req.user.storeId,
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
};

/**
 * @desc    Update an inventory item
 * @route   PUT /api/inventory/:id
 * @access  Private/Admin
 */
const updateInventoryItem = async (req, res) => {
  const { productName, quantity, price, category } = req.body;
  const item = await Inventory.findById(req.params.id);

  if (item && item.storeId.toString() === req.user.storeId.toString()) {
    item.productName = productName || item.productName;
    item.quantity = quantity !== undefined ? quantity : item.quantity;
    item.price = price || item.price;
    item.category = category || item.category;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found or not authorized' });
  }
};

/**
 * @desc    Delete an inventory item
 * @route   DELETE /api/inventory/:id
 * @access  Private/Admin
 */
const deleteInventoryItem = async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (item && item.storeId.toString() === req.user.storeId.toString()) {
    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } else {
    res.status(404).json({ message: 'Item not found or not authorized' });
  }
};


export {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};