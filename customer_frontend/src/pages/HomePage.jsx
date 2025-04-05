import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopByCategory from '../components/ShopByCategory';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-black'}`}>
     
      <div className="p-8">
  <h1 className="text-3xl font-bold mb-4">Welcome to VoltVision</h1>
  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    Powering your world with smart IoT and cutting-edge hardware!
  </p>
</div>

      <HeroSection />
      <ShopByCategory />
      
    </div>
  );
};

export default HomePage;