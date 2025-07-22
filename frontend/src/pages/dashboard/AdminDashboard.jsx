import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const res = await API.get("/expense/getExpenseOfEmployee");
        setExpenses(res.data.getExpenses || []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchAllExpenses();
  }, []);

  const total = expenses.length;
  const pending = expenses.filter(exp => exp.status === "Pending").length;
  const approved = expenses.filter(exp => exp.status === "Approved").length;
  const rejected = expenses.filter(exp => exp.status === "Rejected").length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-white">
          <h2 className="text-md text-[#AAAAAA] font-medium">Total Expenses</h2>
          <p className="text-2xl font-bold mt-1">{total}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-yellow-400">
          <h2 className="text-md font-medium">Pending</h2>
          <p className="text-2xl font-bold mt-1">{pending}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-green-400">
          <h2 className="text-md font-medium">Approved</h2>
          <p className="text-2xl font-bold mt-1">{approved}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-red-400">
          <h2 className="text-md font-medium">Rejected</h2>
          <p className="text-2xl font-bold mt-1">{rejected}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">All Expenses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1E1E1E] text-white rounded-lg">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Created By</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id} className="border-t border-[#333]">
                  <td className="px-4 py-2">{exp.title}</td>
                  <td className="px-4 py-2">₹{exp.amount}</td>
                  <td className="px-4 py-2">{exp.category}</td>
                  <td className="px-4 py-2">{exp.status}</td>
                  <td className="px-4 py-2">{exp.createdBy?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;