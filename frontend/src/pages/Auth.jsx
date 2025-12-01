import React from 'react';
import { Register, Login } from '../components';
import { useLocation } from "react-router-dom";

const Auth = () => {
    const query = new URLSearchParams(useLocation().search);
    const isRegister = query.get("form") === "register";

    return (
        <div className="max-w-screen-xl mx-auto px-5 min-h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
                
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    {isRegister ? <Register /> : <Login />}
                </div>

                <div className="hidden lg:flex flex-col gap-6 w-1/2">
                    <div className="flex flex-col items-start gap-2">
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#B6D783' }}></div>
                        <h3 className="text-xl font-semibold">Organize tasks effortlessly</h3>
                        <p className="text-gray-600">Manage all your projects in one place with our intuitive interface.</p>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#E8855B' }}></div>
                        <h3 className="text-xl font-semibold">Boost team productivity</h3>
                        <p className="text-gray-600">Collaborate with your team and get more done in less time.</p>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#8AB2D3' }}></div>
                        <h3 className="text-xl font-semibold">Access anywhere</h3>
                        <p className="text-gray-600">Use TaskManager on desktop, tablet, or mobile - your tasks sync automatically.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
