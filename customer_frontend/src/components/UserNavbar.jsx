import React, { useState } from 'react';
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext.jsx';

const UserNavbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlistItems, cartItems } = useCartWishlist();
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Orders', path: '/orders' },
    { name: 'Shop Now', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 p-4 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      } flex justify-between items-center h-16`}
    >
      {/* Logo + Theme Toggle */}
      <div className="flex items-center space-x-4">
        <img
          src="/voltvision-images/images/logo_final.png"
          alt="VoltVision Logo"
          className="w-8 h-8"
        />
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
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={`cursor-pointer px-3 py-1 rounded ${
              location.pathname === link.path
                ? 'bg-cyan-500 text-white'
                : 'hover:bg-cyan-100 hover:text-cyan-500'
            }`}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center space-x-4 text-lg relative">
        {/* Search Icon */}
        <FaSearch
          className="hover:text-cyan-400 cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        />
        {showSearch && (
          <div
            className={`absolute top-12 right-0 bg-white shadow-md p-2 rounded ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <input
              type="text"
              placeholder="Search here...."
              className="p-2 border rounded w-64"
            />
          </div>
        )}

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="flex items-center space-x-1">
          <FaHeart className="hover:text-cyan-400 cursor-pointer" />
          <span className="text-sm">({wishlistItems.length})</span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="flex items-center space-x-1">
          <FaShoppingCart className="hover:text-cyan-400 cursor-pointer" />
          <span className="text-sm">({cartItems.length})</span>
        </Link>

        {/* Profile Icon */}
        <FaUser
          className="hover:text-cyan-400 cursor-pointer"
          onClick={() => setShowProfileDropdown((prev) => !prev)}
        />
        {showProfileDropdown && (
          <div
            className={`absolute top-12 right-0 shadow-md p-2 rounded ${
              darkMode ? 'bg-cyan-500 text-black' : 'bg-cyan-100 text-black'
            }`}
          >
            <Link
              to="/register"
              className={`block px-4 py-2 rounded hover:bg-cyan-600 hover:text-white ${
                darkMode ? 'text-black' : 'text-black'
              }`}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={`block px-4 py-2 rounded hover:bg-cyan-600 hover:text-white ${
                darkMode ? 'text-black' : 'text-black'
              }`}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;