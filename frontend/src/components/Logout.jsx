import React, { useState } from 'react';
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { BASE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Modal, ConfirmLogout} from './index'

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true });
      if (res.status === 200) {
        toast.success('Logged Out Successfully')
        navigate('/auth?form=login')
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during logout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 bg-[#B6D783] py-2 px-4 rounded-xl w-3/4 disabled:opacity-50 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
      >
        <LogOut />
        {loading ? 'Logging out...' : 'Logout'}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConfirmLogout onConfirm={handleLogout} onCancel={() => setIsModalOpen(false)}/>
      </Modal>
    </> 
  );
};

export default Logout;
