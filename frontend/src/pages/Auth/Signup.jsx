import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const { login: loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData(prev => ({ ...prev, [ e.target.name ]: e.target.value }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:3000/auth/createUser', formData);
            
            loginUser({ user: data.user, token: data.token }); // ✅ send a full object
            
            toast.success('Signup successfully.');
            navigate('/dashboard');
        
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex justify-center items-center bg-[#121212] text-white overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#AAAAAA]">Name</label>
                        <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/50 transition-all duration-200"
                        required
                        />
                    </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-[#AAAAAA]">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/50 transition-all duration-200"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-[#AAAAAA]">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/50 transition-all duration-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#00BFA6] hover:bg-[#00a790] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1E1E] focus-visible:ring-[#00BFA6] disabled:opacity-50"
                >
                    Sign Up
                </button>
                </form>

                <p className="mt-10 text-sm text-center text-[#AAAAAA]">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#4FC3F7] font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default Signup