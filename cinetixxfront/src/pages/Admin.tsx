import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AllMovies from '../components/Movie/AllMovies'; 
import AllScreenings from '../components/Screening/AllScreenings';
import AllCinemaRooms from '../components/CinemaRoom/AllCinemaRooms';
import AllSeats from '../components/Seat/AllSeats';
import AllStaff from '../components/Staff/AllStaff';
import AllPosition from '../components/Position/AllPosition';

const Admin = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showMovies, setShowMovies] = useState(false); 
  const [showSeats, setShowSeats] = useState(false); 
  const [showCinemaRoom, setShowCinemaRoom] = useState(false); 
    const [showScreenings, setShowScreenings] = useState(false);
    const [showStaff, setShowStaff] = useState(false);
    const [showPosition, setShowPosition] = useState(false);


  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (menuItem: string) => {
 
    if (menuItem === 'Movies') {
      setShowMovies(true);
    } else {
   
      setShowMovies(false);
    }
    if (menuItem === 'Screening') {
      setShowScreenings(true);
    } else {
     
      setShowScreenings(false);
    }
    if (menuItem === 'Seats') {
      setShowSeats(true);
    } else {
     
      setShowSeats(false);
    }
    if (menuItem === 'CinemaRoom') {
      setShowCinemaRoom(true);
    } else {
     
      setShowCinemaRoom(false);
      }
      if (menuItem === 'Staff') {
          setShowStaff(true);
      } else {
          setShowStaff(false)
      }
      if (menuItem === 'Position') {
          setShowPosition(true);
      } else {
          setShowPosition(false);
      }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">CineTixx</h2>
        </div>
        <ul>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('CinemaRoom')}
          >
            Cinema Room
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('Seats')}
          >
            Seats
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('Screening')}
          >
            Screening
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('Movies')} 
          >
            Movies
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('Booking')}
          >
            Booking
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => handleMenuItemClick('Staff')}
          >
            Staff
                  </li>
                  <li
                      className="p-4 cursor-pointer hover:bg-gray-700"
                      onClick={() => handleMenuItemClick('Position')}
                  >
                  Position
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
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl mb-20 font-semibold">CineTixx Admin Panel</h2>

      
        {showMovies && <AllMovies />}
        {showScreenings && <AllScreenings />}
        {showCinemaRoom && <AllCinemaRooms />}
              {showSeats && <AllSeats />}
              {showStaff && <AllStaff />}
              {showPosition && <AllPosition />}
      </div>
    </div>
  );
};

export default Admin;
