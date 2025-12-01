import React, { useState, useEffect } from 'react';
import { AddTask, Modal, Sidebar, SideProfile, Tasklist } from '../components';
import { checkAuth } from '../services/authCheck';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddTask = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {

    checkAuth(navigate)

  }, [navigate]);

  return (
    <div className="flex min-h-[100dvh] ">

      <Sidebar />

      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <button
            className="bg-[#B6D783] text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#a8cc76] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Task
          </button>
        </header>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddTask onSubmit={handleAddTask} onClose={() => setIsModalOpen(false)} />
        </Modal>

        <Tasklist />
      </div>
    </div>
  );
};

export default Dashboard;
