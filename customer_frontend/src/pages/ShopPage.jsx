import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ShopPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen px-6 py-10 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-4">Shop Products</h1>
      <p className="text-lg">Browse our categories and find your tools and gear!</p>
    </div>
  );
};

export default ShopPage;
