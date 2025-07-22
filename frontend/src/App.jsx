import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// App.css
import './App.css'
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center overflow-hidden">
        <Routes>
            <Route path="/" element={<Navigate to='/login' /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/signup" element={<Signup /> } />


            <Route path="/dashboard" element={<Dashboard /> } />
            <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
