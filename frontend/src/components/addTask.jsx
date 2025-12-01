import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';
import { Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddTask = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const taskData = { title, description, dueDate, category };

    try {
      const res = await axios.post(`${BASE_URL}/task/add`, taskData, { withCredentials: true });

      if (res.status === 200) {
        onSubmit();
        setTitle('');
        setDescription('');
        setDueDate('');
        setCategory('Work');
        toast.success("Task Added Successfully");
        window.location.reload();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.data || 'Failed to add task');
      console.error('Failed to add task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Add New Task</h2>
      <p className="text-gray-600 text-base mb-6 text-center">Organize your work with a new task</p>

      {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* inputs */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-800">Task Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-800">Description</label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled={loading}
            className="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#B6D783]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dueDate" className="text-sm font-medium text-gray-800">Due Date</label>
          <DatePicker
            value={dueDate ? moment(dueDate) : null}
            onChange={(date, dateString) => setDueDate(dateString)}
            disabled={loading}
            className="w-full rounded-lg"
            style={{ height: '48px' }}
            disabledDate={current => current && current < moment().startOf('day')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-800">Category</label>
          <Select
            id="category"
            value={category}
            onChange={setCategory}
            disabled={loading}
            className="rounded-lg"
            style={{ height: '48px' }}
          >
            <Option value="Work">Work</Option>
            <Option value="Urgent">Urgent</Option>
            <Option value="Personal">Personal</Option>
            <Option value="Other">Other</Option>
          </Select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-[#B6D783] text-black font-semibold py-4 rounded-lg mt-2 transition-colors cursor-pointer 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a5c973]'}`}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
