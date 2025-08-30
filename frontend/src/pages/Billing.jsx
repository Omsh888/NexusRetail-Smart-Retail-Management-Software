import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming your configured axios instance

const Billing = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch initial data for products and customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await api.get('/inventory');
        const customersRes = await api.get('/crm/customers');
        setProducts(productsRes.data);
        setCustomers(customersRes.data);
      } catch (err) {
        setError('Failed to fetch initial data. Please try again later.');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product._id);
    if (existingItem) {
      // Increase quantity if item is already in the cart
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        { productId: product._id, name: product.productName, price: product.price, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCreateInvoice = async () => {
    if (cart.length === 0) {
        setError('Cannot create an invoice with an empty cart.');
        return;
    }
    if (!selectedCustomerId) {
        setError('Please select a customer.');
        return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    const invoiceData = {
      customerId: selectedCustomerId,
      items: cart.map(({ productId, quantity, price }) => ({ productId, quantity, price })),
      paymentMethod,
    };

    try {
      await api.post('/billing/invoices', invoiceData);
      setSuccess('Invoice created successfully!');
      setCart([]); // Clear cart on success
      setSelectedCustomerId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create invoice.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="p-8 bg-gray-100 min-h-screen grid grid-cols-3 gap-8">
      {/* Left Column: Product Selection */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Invoice</h1>
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="h-[calc(100vh-250px)] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => addToCart(product)}
                className="border rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow bg-gray-50"
              >
                <h3 className="font-semibold text-gray-700">{product.productName}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">Stock: {product.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Cart and Checkout */}
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Cart</h2>
        <div className="h-[40%] overflow-y-auto mb-4 border-b">
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="flex justify-between items-center mb-2 p-2 rounded bg-gray-50">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 font-bold">X</button>
              </div>
            ))
          )}
        </div>
        
        {/* Customer and Payment */}
        <div className="space-y-4">
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>{c.name} - {c.phone}</option>
            ))}
          </select>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>Online</option>
          </select>
        </div>

        {/* Total and Checkout Button */}
        <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
            </div>
            <button
                onClick={handleCreateInvoice}
                disabled={isLoading}
                className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
                {isLoading ? 'Processing...' : 'Create Invoice'}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Billing;