import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    fromDate: "",
    toDate: "",
  });

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

  const handleStatusChange = async (expenseId, newStatus) => {
    try {
      await API.put(`/expense/updateExpense/${expenseId}/status`, {
        status: newStatus,
      });
      setExpenses((prev) =>
        prev.map((exp) =>
          exp._id === expenseId ? { ...exp, status: newStatus } : exp
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (expenseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/expense/deleteExpense/${expenseId}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const total = expenses.length;
  const pending = expenses.filter((exp) => exp.status === "Pending").length;
  const approved = expenses.filter((exp) => exp.status === "Approved").length;
  const rejected = expenses.filter((exp) => exp.status === "Rejected").length;

  const filteredExpenses = expenses.filter((exp) => {
    const { status, category, fromDate, toDate } = filters;
    const expDate = new Date(exp.createdAt);
    return (
      (!status || exp.status === status) &&
      (!category || exp.category === category) &&
      (!fromDate || expDate >= new Date(fromDate)) &&
      (!toDate || expDate <= new Date(toDate))
    );
  });

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 text-black">
        <select
          className="p-2 rounded"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="p-2 rounded"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          {[...new Set(expenses.map((e) => e.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="p-2 rounded"
          value={filters.fromDate}
          onChange={(e) =>
            setFilters({ ...filters, fromDate: e.target.value })
          }
        />
        <input
          type="date"
          className="p-2 rounded"
          value={filters.toDate}
          onChange={(e) =>
            setFilters({ ...filters, toDate: e.target.value })
          }
        />
      </div>

      {/* Table */}
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
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp._id} className="border-t border-[#333]">
                  <td className="px-4 py-2">{exp.title}</td>
                  <td className="px-4 py-2">₹{exp.amount}</td>
                  <td className="px-4 py-2">{exp.category}</td>
                  <td className="px-4 py-2">
                    {exp.status === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(exp._id, "Approved")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(exp._id, "Rejected")
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      exp.status
                    )}
                  </td>
                  <td className="px-4 py-2">{exp.createdBy?.name}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No expenses match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;