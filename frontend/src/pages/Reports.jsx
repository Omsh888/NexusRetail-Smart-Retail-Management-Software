import React, { useState } from 'react';
import api from '../services/api';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both a start and end date.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReportData(null);

    try {
      const res = await api.get(`/reports/sales?startDate=${startDate}&endDate=${endDate}`);
      setReportData(res.data);
    } catch (err) {
      setError('Failed to generate report.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Reports</h1>

      {/* Date Range Selector */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex items-center space-x-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="self-end bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Report Display */}
      {reportData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Report Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 font-semibold">Total Sales Revenue</h3>
                <p className="text-2xl font-bold text-gray-800">${reportData.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-gray-500 font-semibold">Number of Transactions</h3>
                <p className="text-2xl font-bold text-gray-800">{reportData.numberOfTransactions}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">Transaction Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-semibold">Invoice Number</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Total Amount</th>
                  <th className="p-4 font-semibold">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {reportData.salesData.map((sale) => (
                  <tr key={sale._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{sale.invoiceNumber}</td>
                    <td className="p-4">{new Date(sale.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">${sale.totalAmount.toFixed(2)}</td>
                    <td className="p-4">{sale.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;