import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { TaskCard } from '../components';
import { useSearchParams } from 'react-router-dom';
import { Select } from 'antd';

const { Option } = Select;

const Tasklist = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'all';

  const [sortBy, setSortBy] = useState('dueDateAsc');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/task/getalltasks`, { withCredentials: true });
      setStatus(res.status);
      setData(res.data.data);
    } catch (err) {
      setStatus(null);
      setError(err.message || 'Something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg p-5 h-5/6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-5 h-5/6 text-center text-red-500">
        Internal Server Error. Please try after some time!
      </div>
    );
  }

  
  
  if (status === 200) {
    let filteredData = data;
    
    
    if (tab === 'all') {
      filteredData = data.filter(task => !task.completed);
    } else if (tab === 'work') {
      filteredData = data.filter(task => task.category === 'Work' && !task.completed);
    } else if (tab === 'personal') {
      filteredData = data.filter(task => task.category === 'Personal' && !task.completed);
    } else if (tab === 'urgent') {
      filteredData = data.filter(task => task.category === 'Urgent' && !task.completed);
    } else if (tab === 'completed') {
      filteredData = data.filter(task => task.completed);
    }
    
    
    if (status === 200 && filteredData.length === 0) {
      return (
        <div className="bg-white rounded-lg p-5 h-5/6 flex flex-col items-center justify-center text-gray-500">
          <span className="text-5xl mb-4">😊</span>
          <p className="text-lg font-medium">No {tab} tasks left. Click "Add Task" to add new ones!</p>
        </div>
      );
    }
    if (categoryFilter !== 'all') {
      filteredData = filteredData.filter(task => task.category === categoryFilter);
    }

   
    filteredData = filteredData.sort((a, b) => {
      if (sortBy === 'dueDateAsc') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.dueDate) - new Date(a.dueDate);
    });

    return (
      <div>
        <div className="flex gap-4 mb-5 items-center">
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Sort by Due Date:</label>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 160 }}
              options={[
                { label: 'Ascending', value: 'dueDateAsc' },
                { label: 'Descending', value: 'dueDateDesc' }
              ]}
            />
          </div>

          {(tab === 'all' || tab === 'completed') && (
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Filter by Category:</label>
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                style={{ width: 160 }}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Work', value: 'Work' },
                  { label: 'Personal', value: 'Personal' },
                  { label: 'Urgent', value: 'Urgent' }
                ]}
              />
            </div>
          )}

        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    );
  }

  return <></>;
};

export default Tasklist;
