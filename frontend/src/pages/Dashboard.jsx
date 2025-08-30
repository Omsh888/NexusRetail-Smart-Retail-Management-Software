import React from 'react';

// Example stat card component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="text-blue-500">
      {icon}
    </div>
  </div>
);


const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" />
        <StatCard title="Total Sales" value="+1,230" />
        <StatCard title="New Customers" value="+34" />
        <StatCard title="Pending Orders" value="12" />
      </div>

      {/* Other dashboard components like charts or recent activity would go here */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
        {/* Placeholder for a chart */}
        <div className="mt-4 h-64 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;