// Admin.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showMotorcycles, setShowMotorcycles] = useState(false);
 

  const handleMotorcycleClick = () => {
    setShowMotorcycles(true);
  };

  

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">CineTixx</h2>
        </div>
        <ul>
        <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleMotorcycleClick}>
            Cinema Room
          </li>

          <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleMotorcycleClick}>
            Screening
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-700" onClick={handleMotorcycleClick}>
            Movies
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">
            Booking
            </li>
            <li className="p-4 cursor-pointer hover:bg-gray-700">
            Staff
            </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex justify-end">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={handleDropdownToggle}
                className="flex items-center text-white focus:outline-none bg-red"
              >
                <span className="mr-2">Admin</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                   
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl mb-20 font-semibold">CineTixx Admin Panel</h2>

       
      </div>
    </div>
  );
};

export default Admin;
