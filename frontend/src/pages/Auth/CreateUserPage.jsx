import React, { useState } from 'react';
import API from '../../utils/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
  });

  if (!user || user.role !== 'Admin') {
    toast.error("Unauthorized! Only admins can access this page.");
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/admin/create-user', formData);
      toast.success(res.data.message || 'User created successfully!');
      setFormData({ name: '', email: '', password: '', role: 'Employee' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#1e1e1e] p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-white text-2xl font-semibold mb-4 text-center">Create New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#2b2b2b] text-white focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#2b2b2b] text-white focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#2b2b2b] text-white focus:outline-none"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-[#2b2b2b] text-white"
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;