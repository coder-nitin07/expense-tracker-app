import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
        e.preventDefault();

        if(!email || !password){
            return toast.error("Please fill in all fields");
        }

        try {
            const { data } = await axios.post('http://localhost:3000/auth/loginUser', {
                email,
                password
            });

             console.log('Data from backend:', data);
            loginUser({ token: data.token, user: data.user });

            toast.success('Login successfully');
             console.log('Navigating to dashboard...');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.message);
        }
  };

  return (
    <motion.div
        className='min-h-screen flex justify-center items-center bg-[#121212] text-white overflow-hidden'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className='bg-[#1E1E1E] p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-3xl font-bold mb-6 text-center'>Login</h2>

            <form className='space-y-6' onSubmit={ handleLogin }>
                <div>
                    <label className='block mb-2 text-sm font-medium text-[#AAAAAA]'>Email</label>
                    <input 
                        type="text"
                        placeholder='Enter your email'
                        className='w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/50 transition-all duration-200'
                        value={ email }
                        onChange={ (e)=> setEmail(e.target.value) }
                    />
                </div>

                <div>
                    <label className='block mb-1 text-sm font-medium text-[#AAAAAA]'>Password</label>
                    <input 
                        type="password"
                        placeholder='Enter your password'
                        className='w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg focus:outline-none focus:border-[#00BFA6] focus:ring-2 focus:ring-[#00BFA6]/50 transition-all duration-200'
                        value={ password }
                        onChange={ (e)=> setPassword(e.target.value) }
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-[#00BFA6] hover:bg-[#00a790] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E1E1E] focus-visible:ring-[#00BFA6]'
                >
                    Login
                </button>
            </form>

            <p className='mt-10 text-sm text-center text-[#AAAAAA]'>
                Don’t have an account?{" "}
                <Link to='/signup' className='text-[#4FC3F7] font-medium hover:underline'>
                    Sign Up
                </Link>
            </p>
        </div>
    </motion.div>
  )
}

export default Login;