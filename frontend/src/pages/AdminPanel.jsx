import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdCampaign, MdMessage } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);

  return (
    <div className='min-h-screen bg-white font-sans text-gray-900'> 
      <div className='container mx-auto flex flex-col md:flex-row h-auto mt-16'> 
        <aside className='bg-gray-100 w-full md:w-[300px] min-h-screen pt-5 shadow-lg text-gray-800 flex-shrink-0'> 
          <div className='p-4 md:p-6'> 
            <div className='flex flex-col items-center mb-6'> 
              <FaUser size={40} className="text-gray-600 mb-3"/> 
              <h1 className='text-xl font-bold'>{user?.role}</h1>
              <div className='text-sm mt-2 text-center'>{user?.name}</div> 
              <div className='text-sm text-center'>{user?.email}</div> 
            </div>

            <nav className='flex flex-col gap-2'> 
              <NavLink
                to={'AllUsers'}
                className={({ isActive }) => isActive
                  ? "bg-white text-gray-800 font-semibold p-3 rounded-lg flex items-center gap-3 shadow-sm" 
                  : "text-gray-700 p-3 hover:bg-gray-200 rounded-lg flex items-center gap-3 transition-colors"} 
              >
                <FaUser size={20} /> Users
              </NavLink>

              <NavLink
                to={'AllBlogs'}
                className={({ isActive }) => isActive
                  ? "bg-white text-gray-800 font-semibold p-3 rounded-lg flex items-center gap-3 shadow-sm" 
                  : "text-gray-700 p-3 hover:bg-gray-200 rounded-lg flex items-center gap-3 transition-colors"} 
              >
                <MdCampaign size={20} /> Blogs
              </NavLink>

              <NavLink
                to={'AllQueries'}
                className={({ isActive }) => isActive
                  ? "bg-white text-gray-800 font-semibold p-3 rounded-lg flex items-center gap-3 shadow-sm" 
                  : "text-gray-700 p-3 hover:bg-gray-200 rounded-lg flex items-center gap-3 transition-colors"} 
              >
                <MdMessage size={20} /> Queries (Contact Us) 
              </NavLink>

              <NavLink
                to={'AllJobTrends'}
                className={({ isActive }) => isActive
                  ? "bg-white text-gray-800 font-semibold p-3 rounded-lg flex items-center gap-3 shadow-sm" 
                  : "text-gray-700 p-3 hover:bg-gray-200 rounded-lg flex items-center gap-3 transition-colors"} 
              >
                <BsBank2 size={20} /> Job Trends
              </NavLink>

              <NavLink
                to={'AllFeedbacks'}
                className={({ isActive }) => isActive
                  ? "bg-white text-gray-800 font-semibold p-3 rounded-lg flex items-center gap-3 shadow-sm" 
                  : "text-gray-700 p-3 hover:bg-gray-200 rounded-lg flex items-center gap-3 transition-colors"} 
              >
                <VscFeedback size={20} /> Feedbacks
              </NavLink>
            </nav>
          </div>
        </aside>

        <main className='w-full min-h-screen p-6 bg-white text-gray-900'> 
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;