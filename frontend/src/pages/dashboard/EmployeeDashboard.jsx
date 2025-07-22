import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/axios";
import { Link } from "react-router-dom";

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });

   useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/expense/getExpenseOfEmployee");
      const data = res.data.getExpenses;
        console.log("API response:", res.data);
      setTransactions(data);

      const income = data
        .filter((tx) => tx.type === "income")
        .reduce((acc, curr) => acc + (curr.amount || 0), 0);

      const expense = data
        .filter((tx) => tx.type === "expense")
        .reduce((acc, curr) => acc + (curr.amount || 0), 0);

      setTotals({
        income,
        expense,
        balance: income - expense,
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  fetchTransactions();
}, []);


    return (
        <div className="space-y-8">

        <Link   to="/add-expense"
            className="inline-block bg-[#00BFA6] text-white px-4 py-2 rounded-lg shadow hover:bg-teal-500 transition mb-6"
            >
            + Add Expense
        </Link>
        
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-white">
                <h2 className="text-md text-[#AAAAAA] font-medium">Total Balance</h2>
                <p className="text-2xl font-bold mt-1 text-white">₹{totals.balance}</p>
            </div>
            <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-white">
                <h2 className="text-md text-[#AAAAAA] font-medium">Total Income</h2>
                <p className="text-2xl font-bold mt-1 text-[#66BB6A]">₹{totals.income}</p>
            </div>
            <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-white">
                <h2 className="text-md text-[#AAAAAA] font-medium">Total Expenses</h2>
                <p className="text-2xl font-bold mt-1 text-[#FF4C4C]">₹{totals.expense}</p>
            </div>
            </div>

        {/* Recent Transactions */}
        <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <ul className="space-y-3">
             {transactions.slice(0, 5).map((tx) => (
                <li
                    key={tx._id}
                    className="bg-[#1E1E1E] p-3 rounded-lg shadow-sm flex justify-between items-center"
                >
                    <span className="text-white">{tx.title}</span>
                    <span
                    className={`${
                        tx.type === "income" ? "text-[#66BB6A]" : "text-[#FF4C4C]"
                    }`}
                    >
                    {tx.type === "income" ? "+" : "-"} ₹{tx.amount}
                    </span>
                </li>
            ))}
            </ul>
            
        </div>

        <div className="text-right mt-4">
  <Link
    to="/my-expenses"
    className="text-[#4FC3F7] hover:underline text-sm font-medium"
  >
    View All Expenses →
  </Link>
</div>

        </div>
    );
};

export default EmployeeDashboard;
