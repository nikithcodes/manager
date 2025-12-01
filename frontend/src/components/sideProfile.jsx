import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Logout } from '../components';
import { BASE_URL } from '../constants';

const SideProfile = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await axios.get(`${BASE_URL}/user/profile`, { withCredentials: true });
                if (res.status === 200) {
                    setUser(res.data.data);
                } else {
                    setError('Failed to load user data');
                }
            } catch {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

    return (
        <div className="p-6 border-t border-gray-200 flex items-center flex-col gap-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">👤</div>
                {error ? <div className="text-center text-red-500">{error}</div> :
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                }
            </div>
            <Logout />
        </div>
    );
};

export default SideProfile;
