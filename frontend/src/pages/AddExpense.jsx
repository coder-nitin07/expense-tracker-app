import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/expense/createExpese", formData);
      toast.success(res.data.message || "Expense added successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[#1E1E1E] p-6 rounded-xl shadow text-white">
      <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-[#AAAAAA]">Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 rounded bg-[#121212] text-white border border-[#333]"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-[#AAAAAA]">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            className="w-full p-2 rounded bg-[#121212] text-white border border-[#333]"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-[#AAAAAA]">Category</label>
          <select
            name="category"
            className="w-full p-2 rounded bg-[#121212] text-white border border-[#333]"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-[#AAAAAA]">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full p-2 rounded bg-[#121212] text-white border border-[#333]"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-[#00BFA6] hover:bg-teal-500 text-white py-2 px-6 rounded shadow"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;