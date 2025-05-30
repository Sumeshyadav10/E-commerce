import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md dark:bg-gray-900 dark:text-white bg-white text-black">
      <div className="text-xl font-bold flex items-center gap-2">
        <img src="/logo.png" alt="Voltvision" className="w-8 h-8" />
        VOLTVISION
      </div>
      <div className="flex gap-6 items-center">
        <NavLink to="/" className="hover:underline">Home</NavLink>
        <NavLink to="/about" className="hover:underline">About</NavLink>
        <NavLink to="/services" className="hover:underline">Services</NavLink>
        <NavLink to="/calculators" className="hover:underline">Calculators</NavLink>
        <NavLink to="/contact" className="hover:underline">Contact</NavLink>
        <NavLink to="/shop" className="hover:underline">Shop</NavLink>
        <button onClick={toggleDarkMode} className="ml-4 border px-2 py-1 rounded">
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
