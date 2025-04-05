import React from 'react';
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const UserNavbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
      <nav className={`sticky top-0 z-50 p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex justify-between items-center h-16`}>      
      {/* Logo + Theme Toggle */}
      <div className="flex items-center space-x-4">
        <img src="/voltvision-images/images/logo_final.png" alt="VoltVision Logo" className="w-8 h-8" />
        <span className="font-bold text-lg">VOLTVISION</span>

        {/* Theme Toggle Icon */}
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:text-cyan-400 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Center Navigation Links */}
      <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
        <li className="hover:text-cyan-400 cursor-pointer">Home</li>
        <li className="hover:text-cyan-400 cursor-pointer">Orders</li>
        <li className="hover:text-cyan-400 cursor-pointer">Shop Now</li>
        <li className="hover:text-cyan-400 cursor-pointer">Contact Us</li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center space-x-4 text-lg">
        <FaSearch className="hover:text-cyan-400 cursor-pointer" />
        <div className="flex items-center space-x-1">
          <FaHeart className="hover:text-cyan-400 cursor-pointer" />
          <span className="text-sm">(0)</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaShoppingCart className="hover:text-cyan-400 cursor-pointer" />
          <span className="text-sm">(0)</span>
        </div>
        <FaUser className="hover:text-cyan-400 cursor-pointer" />
      </div>
    </nav>
  );
};

export default UserNavbar;
