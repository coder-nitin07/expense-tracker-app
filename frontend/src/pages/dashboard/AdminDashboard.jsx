import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import AnalyticsCharts from "../../components/AnalyticsCharts";
import Papa from "papaparse";
import { Link } from 'react-router-dom';
import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    fromDate: "",
    toDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  
  


  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const res = await API.get("http://localhost:3000/expense/getExpenseOfEmployee");
        setExpenses(res.data.getExpenses || []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchAllExpenses();
  }, []);

  const handleStatusChange = async (expenseId, newStatus) => {
    try {
      await API.put(`http://localhost:3000/expense/updateExpense/${expenseId}/status`, {
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

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  const handleExportCSV = () => {
  if (filteredExpenses.length === 0) {
    alert("No expenses to export.");
    return;
  }

  const csvData = filteredExpenses.map((exp) => ({
    Title: exp.title,
    Amount: exp.amount,
    Category: exp.category,
    Status: exp.status,
    CreatedBy: exp.createdBy?.name || "N/A",
    CreatedAt: new Date(exp.createdAt).toLocaleString(),
    Description: exp.description || "",
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "expenses.csv");
};
  return (
    
    <div className="space-y-8">
       <Link to="/admin/create-user" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        + Create User
      </Link>

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
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="p-2 rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
        <input
          type="date"
          className="p-2 rounded"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />
      </div>

      <AnalyticsCharts />

      <button
  onClick={handleExportCSV}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Export CSV
</button>


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
  {paginatedExpenses.map((exp) => (
    <tr key={exp._id} className="border-t border-[#333]">
      <td className="px-4 py-2">{exp.title}</td>
      <td className="px-4 py-2">₹{exp.amount}</td>
      <td className="px-4 py-2">{exp.category}</td>
      <td className="px-4 py-2">
        {exp.status === "Pending" ? (
          <>
            <button
              onClick={() => handleStatusChange(exp._id, "Approved")}
              className="bg-green-600 text-white px-3 py-1 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(exp._id, "Rejected")}
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
  {paginatedExpenses.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center py-4 text-gray-400">
        No expenses match the selected filters.
      </td>
    </tr>
  )}
</tbody>

          </table>


          <div className="flex justify-center mt-6 gap-2 text-white">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 rounded ${
        page === currentPage ? "bg-blue-600" : "bg-gray-700"
      }`}
    >
      {page}
    </button>
  ))}

  <button
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

        </div>
      </div>

      {/* View Modal */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full relative shadow-lg">
            <button
              onClick={() => setSelectedExpense(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Expense Details</h2>
            <p><strong>Title:</strong> {selectedExpense.title}</p>
            <p><strong>Amount:</strong> ₹{selectedExpense.amount}</p>
            <p><strong>Category:</strong> {selectedExpense.category}</p>
            <p><strong>Status:</strong> {selectedExpense.status}</p>
            <p><strong>Description:</strong> {selectedExpense.description || 'N/A'}</p>
            <p><strong>Created By:</strong> {selectedExpense.createdBy?.name}</p>
            <p><strong>Date:</strong> {new Date(selectedExpense.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;