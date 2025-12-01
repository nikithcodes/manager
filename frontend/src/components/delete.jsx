import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const DeleteConfirmation = ({ onCancel, title, _id }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/task/delete?task=${_id}`, { withCredentials: true });
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-white rounded-xl max-w-sm mx-auto text-center">
            <p className="mb-6 text-gray-800 font-semibold">Are you sure you want to delete this task "{title}"?</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`px-5 py-2 rounded-md cursor-pointer transition ${loading
                            ? 'bg-red-400 cursor-not-allowed text-white'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
