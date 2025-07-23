import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';
import API from '../utils/axios';

const AnalyticsCharts = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const catRes = await API.get('http://localhost:3000/analytics/total-expense-by-category');
        const monthRes = await API.get('http://localhost:3000/analytics/get-expense-by-month');

        console.log("Raw Category Data:", catRes.data);
        console.log("Raw Monthly Data:", monthRes.data);

        let transformedCatData = [];

        if (catRes.data && typeof catRes.data === 'object' && !Array.isArray(catRes.data)) {
          transformedCatData = Object.entries(catRes.data).map(([key, value]) => ({
            _id: key,
            totalAmount: value,
          }));
        } else if (Array.isArray(catRes.data)) {
          transformedCatData = catRes.data;
        }

        if (monthRes.data && typeof monthRes.data === 'object' && !Array.isArray(monthRes.data)) {
  const transformedMonthData = Object.entries(monthRes.data).map(([key, value]) => ({
    _id: key,
    totalAmount: value,
  }));
  setMonthlyData(transformedMonthData);
} else if (Array.isArray(monthRes.data)) {
  setMonthlyData(monthRes.data);
} else {
  setMonthlyData([]);
}

        setCategoryData(Array.isArray(transformedCatData) ? transformedCatData : []);
        // setMonthlyData(Array.isArray(monthRes.data) ? monthRes.data : []);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setCategoryData([]);
        setMonthlyData([]);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      {/* ✅ Category Chart */}
      {Array.isArray(categoryData) && categoryData.length > 0 ? (
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">Expense by Category</h2>
          <div className="bg-[#1E1E1E] p-4 rounded-xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalAmount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-white">No category data available.</p>
      )}

      {/* ✅ Monthly Chart */}
      {Array.isArray(monthlyData) && monthlyData.length > 0 ? (
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">Monthly Expenses</h2>
          <div className="bg-[#1E1E1E] p-4 rounded-xl">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalAmount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-white">No monthly data available.</p>
      )}
    </div>
  );
};

export default AnalyticsCharts;
