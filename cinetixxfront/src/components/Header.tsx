import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);

  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className=" container mx-auto flex justify-between items-center text-lg">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-3">Cinetixx</h1>
        </div>
        <nav className="hidden sm:hidden md:flex md:flex-grow md:justify-center md:font-bold sm:flex">
  <ul className="flex  md:flex-row space-x-10">
    <li className='relative left-10 md:left-0'><a href="#" className="hover:text-gray-300">Home</a></li>
    <li><a href="#" className="hover:text-gray-300">About</a></li>
    <li><a href="#" className="hover:text-gray-300">Services</a></li>
    <li><a href="#" className="hover:text-gray-300">Contact</a></li>
  </ul>
</nav>


        <div className="flex items-center space-x-4 mr-3">
          <button className="hidden md:block  bg-[#FFFFEC] text-gray-800 px-4 py-2 rounded"><Link to="/login" className="font-medium text-[#676c76] hover:text-indigo-200">Sign In</Link></button>
          <button className="hidden md:block bg-[#DD761C] text-gray-800 px-4 py-2 rounded"><Link to="/register" className="font-medium text-white hover:text-indigo-200">Sign Up</Link></button>
          <button className="md:hidden" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black  flex justify-center items-center ">
          <div>
            <button className="absolute top-10 right-10 m-2" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="text-center font-bold text-4xl mb-40 ">
              <li className="m-10"><a href="#" className="hover:text-gray-300">Home</a></li>
              <li className="m-10"><a href="#" className="hover:text-gray-300">About</a></li>
              <li className="m-10"><a href="#" className="hover:text-gray-300">Services</a></li>
              <li className="m-10"><a href="#" className="hover:text-gray-300">Contact</a></li>
              
            </ul>
            <button className="relative right-10 bottom-20 w-40 bg-[#FFFFEC] text-gray-800 px-4 py-2 rounded"><Link to="/login" className="font-medium text-[#676c76] hover:text-indigo-200">Sign In</Link></button>
          <button className=" relative left-10 bottom-20 w-40 bg-[#DD761C] text-gray-800 px-4 py-2 rounded"><Link to="/register" className="font-medium text-white hover:text-indigo-200">Sign Up</Link></button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;