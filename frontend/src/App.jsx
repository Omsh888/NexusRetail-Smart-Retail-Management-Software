import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'; // A component to protect routes

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/inventory" 
            element={<ProtectedRoute><Inventory /></ProtectedRoute>} 
          />
          <Route 
            path="/billing" 
            element={<ProtectedRoute><Billing /></ProtectedRoute>} 
          />
          {/* Add other protected routes here */}
        </Routes>
      </main>
    </div>
  );
}

export default App;