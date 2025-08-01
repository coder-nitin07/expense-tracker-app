import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// App.css
import './App.css'
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import MyExpenses from "./pages/MyExpenses";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuditLogs from "./pages/AuditLogs";
import CreateUserPage from "./pages/Auth/CreateUserPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white flex justify-center items-center overflow-hidden ">
        <Routes>
            <Route path="/" element={<Navigate to='/login' /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/signup" element={<Signup /> } />
            <Route path="/admin/create-user" element={<CreateUserPage />} />

             {/* Protected Routes (for both Admin and Employee) */}
            <Route element={<ProtectedRoute allowedRoles={["Admin", "Employee"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Employee-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/my-expenses" element={<MyExpenses />} />
            </Route>

          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/audit-logs" element={<AuditLogs />} />
          </Route>


            <Route path="/dashboard" element={<Dashboard /> } />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/my-expenses" element={<MyExpenses />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
