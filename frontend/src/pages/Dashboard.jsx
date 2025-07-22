// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name?.split(' ')[0] || 'User'} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
          <p className="text-3xl font-bold">₹0.00</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-400">No recent expenses</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-400">No categories yet</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
