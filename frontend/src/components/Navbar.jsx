import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import logo from '../asset/Images/logo2.png';
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const [isHovered, setIsHovered] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  const toggleMenu = () => setMenuVisible(prev => !prev);

  return (
    <div>
      <nav className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-opacity-80 backdrop-blur-md h-[80px] shadow-md fixed top-0 left-0 w-full z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div className="flex items-center justify-center flex-1 sm:justify-start">
              <div className="text-white text-xl font-bold flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-10" />
                <div className="text-2xl">ROC8</div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-8 items-center h-full">
                <NavLink
                  to="/Home"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Aboutus"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/Services"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Services
                </NavLink>
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/Blog"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Blog
                </NavLink>

                {/* User Section */}
                {user?.name ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center space-x-1 cursor-pointer text-white bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">
                      <span>{user?.name}</span>
                      <FaRegUserCircle />
                    </div>

                    {isHovered && (
                      <div className="absolute right-0 mt-0 w-40 bg-white shadow-lg rounded-md z-50 flex flex-col">
                        {/* Triangle Indicator */}
                        <div className="absolute -top-2 right-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

                        <NavLink
                          to="/Profile"
                          className="cursor-pointer border-2 text-black hover:bg-gray-200 hover:text-gray-600 px-4 py-2 w-full text-left text-lg rounded-b-md"
                        >
                          Profile
                        </NavLink>
                        {user?.role === "ADMIN" && (
                          <NavLink
                            to="/AdminPanel"
                            className="cursor-pointer border-2 text-black hover:bg-gray-200 hover:text-gray-600 px-4 py-2 w-full text-left text-lg rounded-t-md"
                          >
                            Admin Panel
                          </NavLink>
                        )}

                        <div
                          onClick={handleLogout}
                          className="cursor-pointer border-2 text-black hover:bg-gray-200 hover:text-gray-600 px-4 py-2 w-full text-left text-lg rounded-b-md"
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/Login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-gray-700 px-3 py-2 rounded-md text-lg font-medium"
                        : "text-white bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                    }
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;