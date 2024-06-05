import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AllMovies from '../components/Movie/AllMovies';
import AllScreenings from '../components/Screening/AllScreenings';
import AllCinemaRooms from '../components/CinemaRoom/AllCinemaRooms';
import AllSeats from '../components/Seat/AllSeats';
import AllPosition from '../components/Position/AllPosition';
import AllStaff from '../components/Staff/AllStaff';
import AllComingSoon from '../components/ComingSoon/AllComingSoon';
import AllEvents from '../components/Events/AllEvents';
import { FaFilm, FaChair, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaClipboardList, FaTicketAlt, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
const Admin = ({ role }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Movies');
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveSection(menuItem);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const renderContent = () => {
    switch (activeSection) {
      case 'Movies':
        return <AllMovies />;
      case 'Screening':
        return <AllScreenings />;
      case 'Seats':
        return <AllSeats />;
      case 'CinemaRoom':
        return <AllCinemaRooms />;
      case 'Position':
        return <AllPosition />;
      case 'Staff':
        return <AllStaff />;
      case 'Coming Soon':
        return <AllComingSoon />;
      case 'Events':
        return <AllEvents />;
      default:
        return <AllMovies />;
    }
  };
  if (role == 'Admin') {
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 flex items-center justify-between bg-gray-900">
          <h2 className="text-2xl font-semibold">CineTixx</h2>
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="text-white focus:outline-none"
          >
            <FaUser className="h-5 w-5" />
          </button>
        </div>
        <ul>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'CinemaRoom' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('CinemaRoom')}
          >
            <FaMapMarkerAlt className="mr-2" /> Cinema Room
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Seats' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Seats')}
          >
            <FaChair className="mr-2" /> Seats
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Screening' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Screening')}
          >
            <FaCalendarAlt className="mr-2" /> Screening
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Movies' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Movies')}
          >
            <FaFilm className="mr-2" /> Movies
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Booking' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Booking')}
          >
            <FaTicketAlt className="mr-2" /> Booking
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Staff' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Staff')}
          >
            <FaUser className="mr-2" /> Staff
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Position' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Position')}
          >
            <FaClipboardList className="mr-2" /> Position
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Coming Soon' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Coming Soon')}
          >
            <FaPlusCircle className="mr-2" /> Coming Soon
          </li>
          <li
            className={`p-4 flex items-center cursor-pointer hover:bg-gray-700 ${activeSection === 'Events' ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuItemClick('Events')}
          >
            <FaCalendarAlt className="mr-2" /> Events
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
                  </div>
                </div>
              )}
            </div>
            <button
            type="button"
            onClick={handleLogout}
            className="flex items-center text-white bg-red-600 px-4 py-2 rounded"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
          </div>
          <h2 className="text-3xl mb-20 font-semibold">CineTixx Admin Panel</h2>
          
          <div>
          {renderContent()}
        </div>
        </div>
      </div>
    );
  }

  if (role == 'User') {
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4">
            <h2 className="text-2xl font-semibold">CineTixx</h2>
          </div>
          {/* <ul>
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
          </ul> */}
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
                  <span className="mr-2">Account</span>
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
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          <h2 className="text-3xl mb-20 font-semibold">CineTixx User Panel</h2>
  
        </div>
      </div>
    );
  }
};

export default Admin;