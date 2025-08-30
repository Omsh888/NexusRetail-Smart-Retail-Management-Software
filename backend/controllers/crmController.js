import Customer from '../models/Customer.js';

/**
 * @desc    Add a new customer
 * @route   POST /api/crm/customers
 * @access  Private/Staff
 */
const addCustomer = async (req, res) => {
  const { name, phone, email } = req.body;
  const customerExists = await Customer.findOne({ phone, storeId: req.user.storeId });

  if (customerExists) {
    return res.status(400).json({ message: 'Customer with this phone number already exists' });
  }

  const customer = await Customer.create({
    name,
    phone,
    email,
    storeId: req.user.storeId,
  });

  res.status(201).json(customer);
};

/**
 * @desc    Get all customers
 * @route   GET /api/crm/customers
 * @access  Private/Staff
 */
const getCustomers = async (req, res) => {
  const customers = await Customer.find({ storeId: req.user.storeId });
  res.json(customers);
};

/**
 * @desc    Update customer details
 * @route   PUT /api/crm/customers/:id
 * @access  Private/Staff
 */
const updateCustomer = async (req, res) => {
    const { name, email, loyaltyPoints } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (customer && customer.storeId.toString() === req.user.storeId.toString()) {
        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.loyaltyPoints = loyaltyPoints !== undefined ? loyaltyPoints : customer.loyaltyPoints;

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } else {
        res.status(404).json({ message: 'Customer not found or not authorized' });
    }
};

export { addCustomer, getCustomers, updateCustomer };