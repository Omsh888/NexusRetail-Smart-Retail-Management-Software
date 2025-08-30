import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/crm/customers');
      setCustomers(res.data);
    } catch (err) {
      setError('Failed to fetch customers.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setFormError('Name and Phone are required.');
      return;
    }
    
    try {
        await api.post('/crm/customers', { name, email, phone });
        // Reset form and refetch data
        setName('');
        setPhone('');
        setEmail('');
        setFormError('');
        fetchCustomers(); // Refresh the customer list
    } catch(err) {
        setFormError(err.response?.data?.message || 'Failed to add customer.');
        console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Customer Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Customer</h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                 <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                 <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Add Customer
                </button>
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
            </form>
        </div>

        {/* Customer List */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Customer List</h2>
          {isLoading ? (
            <p>Loading customers...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Phone</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Loyalty Points</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{customer.name}</td>
                      <td className="p-4">{customer.phone}</td>
                      <td className="p-4">{customer.email || 'N/A'}</td>
                      <td className="p-4">{customer.loyaltyPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRM;