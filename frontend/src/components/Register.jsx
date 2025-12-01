import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants.js';
import { toast } from 'react-toastify';
import {Modal,TermsPrivacyContent} from './'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState('')
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${BASE_URL}/user/register`, { name, email, password });
            if (res.status === 200) {
                setMessage("Account created! Please verify your email via the link sent on it and attempt login.");
                toast.success('Account Creation Successfully !')
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex-1 max-w-lg bg-white p-10 rounded-xl shadow-xl">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h2>
                <p className="text-gray-600 text-base">Join thousands of businesses that use TaskManager every day</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleRegister}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-800">Full Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required className="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783]" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-800">Email Address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783]" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-800">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required className="p-3 pr-10 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783] w-full" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl cursor-pointer">
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-10 h-1 bg-gray-200 rounded-sm"></span>
                        <span>Password must be at least 8 characters</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm mt-2">
                    <input type="checkbox" id="terms" required className="w-4 h-4 cursor-pointer" />
                    <label htmlFor="terms">
                        I agree to the <a href="#" className="text-[#E8855B]" onClick={() => setIsModalOpen(true)}>Terms of Service</a> and <a href="#" className="text-[#E8855B]" onClick={() => setIsModalOpen(true)}>Privacy Policy</a>
                    </label>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button type="submit" className="bg-[#B6D783] text-black font-semibold py-4 rounded-lg mt-2 hover:bg-[#a5c973] transition-colors disabled:opacity-50 cursor-pointer" disabled={loading}>
                    {loading ? 'Registering...' : 'Create Account'}
                </button>

                {message && (
                    <p className="text-green-600 text-sm text-center font-medium">
                        {message}
                    </p>
                )}

                <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account? <span className="text-[#E8855B] font-medium cursor-pointer" onClick={() => navigate('/auth?form=login')}>Log in</span>
                </p>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TermsPrivacyContent/>
            </Modal>
        </div>
    );
};

export default Register;
