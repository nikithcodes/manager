import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const UpdateTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const updatedData = { _id: task._id, title, description, dueDate, category };

    try {
      const res = await axios.patch(`${BASE_URL}/task/update`, updatedData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      setError(err.response?.data?.data || 'Failed to update task');
      console.error('Failed to update task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Update Task</h2>
      <p className="text-gray-600 text-base mb-6 text-center">Edit your task details</p>

      {error && <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>}

      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-800">
            Task Title
          </label>
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
          <label htmlFor="description" className="text-sm font-medium text-gray-800">
            Description
          </label>
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
          <label htmlFor="dueDate" className="text-sm font-medium text-gray-800">
            Due Date
          </label>
          <DatePicker
            id="dueDate"
            value={dueDate ? dayjs(dueDate) : null}
            onChange={(date, dateString) => setDueDate(dateString)}
            disabled={loading}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            className="w-full rounded-lg"
            style={{ height: '48px' }}
          />

        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-800">
            Category
          </label>
          <Select
            id="category"
            value={category}
            onChange={(value) => setCategory(value)}
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
          className={`bg-[#B6D783] text-black font-semibold py-4 rounded-lg mt-2 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a5c973]'
            }`}
        >
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
