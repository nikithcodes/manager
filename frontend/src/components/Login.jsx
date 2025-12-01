import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants.js'
import { toast } from 'react-toastify';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${BASE_URL}/user/login`, { email, password },{withCredentials:true});
            if(res.status === 200) {
                toast.success('Login Successfull !')
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="flex-1 max-w-lg bg-white p-10 rounded-xl shadow-xl items-center justify-center h-[70vh]">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
                <p className="text-gray-600 text-base">Login to access your TaskManager account</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-800">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-800">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="p-3 pr-10 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783] w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl cursor-pointer"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {/* <div className="text-right text-sm">
                        <a href="#forgot" className="text-[#E8855B]">Forgot password?</a>
                    </div> */}
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="bg-[#B6D783] text-black font-semibold py-4 rounded-lg mt-2 hover:bg-[#a5c973] transition-colors disabled:opacity-50 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-5">
                    Don’t have an account?{' '}
                    <span
                        className="text-[#E8855B] font-medium cursor-pointer"
                        onClick={() => navigate('/auth?form=register')}
                    >
                        Register
                    </span>
                </p>
            </form>
            
        </div>
    );
};

export default Login;
