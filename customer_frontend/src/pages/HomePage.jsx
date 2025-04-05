import React from 'react';
import UserNavbar from '../components/UserNavbar';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-black'}`}>
      <UserNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to VoltVision</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Explore the latest tech products here!
        </p>
      </div>
    </div>
  );
};

export default HomePage;