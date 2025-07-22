import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { format } from "date-fns";

const MyExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get("/expense/getExpenseOfEmployee");
        setExpenses(res.data.getExpenses || []);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-[#66BB6A]";
      case "Rejected":
        return "text-[#FF4C4C]";
      default:
        return "text-[#FFA726]";
    }
  };

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">My Expenses</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1E1E1E] rounded-xl">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-4 text-[#AAAAAA]">Title</th>
              <th className="p-4 text-[#AAAAAA]">Amount</th>
              <th className="p-4 text-[#AAAAAA]">Category</th>
              <th className="p-4 text-[#AAAAAA]">Status</th>
              <th className="p-4 text-[#AAAAAA]">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-b border-gray-800 hover:bg-[#2A2A2A]">
                <td className="p-4">{exp.title}</td>
                <td className="p-4">₹{exp.amount}</td>
                <td className="p-4">{exp.category}</td>
                <td className={`p-4 font-semibold ${getStatusColor(exp.status)}`}>{exp.status}</td>
                <td className="p-4">{format(new Date(exp.createdAt), "dd MMM yyyy")}</td>
              </tr>
            ))}

            {expenses.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-[#AAAAAA]">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExpenses;