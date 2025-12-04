import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SideProfile } from '../components';

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tab) => {
    setSearchParams({ tab });
    setIsOpen(false);
  };

  return (
    <>
      
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <span
          className={`block h-0.5 w-6 bg-black rounded transform transition duration-300 ease-in-out origin-center ${isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black rounded my-1 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'
            }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black rounded transform transition duration-300 ease-in-out origin-center ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
        />
      </button>



      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md flex flex-col w-64
          transform transition-transform duration-300 ease-in-out z-40
          md:relative md:h-auto md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-5 pr-8 border-b border-gray-200 flex items-center gap-2 justify-end md:justify-start">
          <div className="w-[30px] h-[30px] bg-[#E8855B] rounded-full"></div>
          <span className="text-lg font-bold">TaskManager</span>
        </div>


        <nav className="flex-1 flex flex-col py-5">
          <ul className="flex-1 list-none">
            {[
              { label: 'My Tasks', icon: '📋', value: 'all' },
              { label: 'Urgent', icon: '⚠️', value: 'urgent' },
              { label: 'Work', icon: '💼', value: 'work' },
              { label: 'Personal', icon: '🏠', value: 'personal' },
              { label: 'Completed', icon: '✅', value: 'completed' },
            ].map(({ label, icon, value }) => (
              <li
                key={value}
                onClick={() => handleTabClick(value)}
                className={`flex items-center gap-4 px-5 py-3 cursor-pointer ${activeTab === value
                    ? 'bg-[#f0f7e8] border-l-4 border-[#B6D783] font-medium'
                    : 'hover:bg-gray-100'
                  }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
              </li>
            ))}
          </ul>

          <SideProfile />
        </nav>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
