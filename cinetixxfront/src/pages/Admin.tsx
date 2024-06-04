import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllMovies from '../components/Movie/AllMovies';
import AllScreenings from '../components/Screening/AllScreenings';
import AllCinemaRooms from '../components/CinemaRoom/AllCinemaRooms';
import AllSeats from '../components/Seat/AllSeats';
import AllPosition from '../components/Position/AllPosition';
import AllStaff from '../components/Staff/AllStaff';
import AllComingSoon from '../components/ComingSoon/AllComingSoon';

const Admin = ({ role }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">CineTixx</h2>
                </div>
                <ul>
                    <MenuItem
                        label="Cinema Room"
                        active={activeMenuItem === 'CinemaRoom'}
                        onClick={() => handleMenuItemClick('CinemaRoom')}
                    />
                    <MenuItem
                        label="Seats"
                        active={activeMenuItem === 'Seats'}
                        onClick={() => handleMenuItemClick('Seats')}
                    />
                    <MenuItem
                        label="Screening"
                        active={activeMenuItem === 'Screening'}
                        onClick={() => handleMenuItemClick('Screening')}
                    />
                    <MenuItem
                        label="Movies"
                        active={activeMenuItem === 'Movies'}
                        onClick={() => handleMenuItemClick('Movies')}
                    />
                    <MenuItem
                        label="Booking"
                        active={activeMenuItem === 'Booking'}
                        onClick={() => handleMenuItemClick('Booking')}
                    />
                    <MenuItem
                        label="Staff"
                        active={activeMenuItem === 'Staff'}
                        onClick={() => handleMenuItemClick('Staff')}
                    />
                    <MenuItem
                        label="Position"
                        active={activeMenuItem === 'Position'}
                        onClick={() => handleMenuItemClick('Position')}
                    />
                    <MenuItem
                        label="Coming Soon"
                        active={activeMenuItem === 'ComingSoon'}
                        onClick={() => handleMenuItemClick('ComingSoon')}
                    />
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
                                <span className="mr-2">{role}</span>
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

                <h2 className="text-3xl mb-20 font-semibold">CineTixx {role} Panel</h2>

                {activeMenuItem === 'Movies' && <AllMovies />}
                {activeMenuItem === 'Screening' && <AllScreenings />}
                {activeMenuItem === 'CinemaRoom' && <AllCinemaRooms />}
                {activeMenuItem === 'Seats' && <AllSeats />}
                {activeMenuItem === 'Position' && <AllPosition />}
                {activeMenuItem === 'Staff' && <AllStaff />}
                {activeMenuItem === 'ComingSoon' && <AllComingSoon />}
            </div>
        </div>
    );
};

const MenuItem = ({ label, active, onClick }) => {
    return (
        <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${active ? 'bg-gray-700' : ''}`}
            onClick={onClick}
        >
            {label}
        </li>
    );
};

export default Admin;
