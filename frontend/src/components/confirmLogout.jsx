import React from 'react';

const ConfirmLogout = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="bg-white rounded-xl ">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Confirm Logout</h2>
      <p className="text-gray-600 mb-6 text-center">Are you sure you want to log out ?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="px-5 py-2.5 rounded-full bg-[#E8855B] text-white font-medium hover:opacity-90 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmLogout;
