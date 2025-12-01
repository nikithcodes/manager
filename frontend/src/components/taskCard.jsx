import React, { useState, useRef, useEffect } from 'react';
import { Modal, UpdateTask, TaskDetails, DeleteConfirmation, CompleteConfirmation } from './index.js';


const TaskCard = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isCompleteOpen, setIsCompleteOpen] = useState(false)

    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div
                className="flex flex-col p-6 bg-white rounded-xl shadow-md cursor-pointer relative max-w-md"
                onClick={() => setIsTaskOpen(true)}>
                <div className="absolute top-3 right-3" ref={dropdownRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setDropdownOpen((prev) => !prev);
                        }}
                        className="text-2xl select-none cursor-pointer text-gray-600 hover:text-gray-900 transition"
                        aria-label="Options"
                    >
                        ⋮
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20 text-sm border border-gray-200 ">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-[#B6D783] hover:text-black transition cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeleteOpen(true)
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-[#B6D783] hover:text-black transition cursor-pointer"

                            >
                                Delete
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCompleteOpen(true)
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-[#B6D783] hover:text-black transition cursor-pointer"
                            >
                                Mark as Complete
                            </button>
                        </div>
                    )}
                </div>

                <h3 className="font-semibold text-xl text-gray-800 mb-1 line-clamp-2">
                    {task.title}
                </h3>


                <p
                    className={`text-sm font-medium mb-2 px-4 py-1 rounded-2xl w-fit 
                        ${task.category === 'Work' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                            task.category === 'Personal' ? 'bg-[#D1FAE5] text-[#065F46]' :
                                task.category === 'Urgent' ? 'bg-[#FEE2E2] text-[#B91C1C]' :
                                    'bg-gray-100 text-gray-600'
                        }`}
                >
                    {task.category}
                </p>

                <p className="text-sm font-semibold text-gray-700">
                    {task.completed
                        ? `✅ Completed ${Math.max(0, Math.ceil((new Date() - new Date(task.updatedAt)) / (1000 * 60 * 60 * 24)))} days ago`
                        : `⏳ ${Math.max(0, Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)))} days left to complete`}
                </p>

                <p className={`text-sm font-semibold py-2 ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                    {task.completed ? 'Completed' : 'Incomplete'}
                </p>
            </div>

            <Modal isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)}>
                <CompleteConfirmation title={task.title} _id={task._id} onCancel={() => setIsCompleteOpen(false)} />
            </Modal>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <DeleteConfirmation _id={task._id} title={task.title} onCancel={() => setIsDeleteOpen(false)} />
            </Modal>

            <Modal isOpen={isTaskOpen} onClose={() => setIsTaskOpen(false)}>
                <TaskDetails task={task} />
            </Modal>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UpdateTask task={task} onSubmit={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default TaskCard;
