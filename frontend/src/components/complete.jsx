import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const CompleteConfirmation = ({ onCancel, title, _id }) => {
  const [loading, setLoading] = useState(false);

  console.log(_id)
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(`${BASE_URL}/task/markcomplete/${_id}`,{},{ withCredentials: true });
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white rounded-xl  max-w-sm mx-auto text-center">
      <p className="mb-6 text-gray-800 font-semibold">
        Are you sure this task <strong>{title}</strong> is complete?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } text-white px-5 py-2 rounded-md transition cursor-pointer`}
        >
          {loading ? 'Marking...' : 'Mark as Complete'}
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

export default CompleteConfirmation;
