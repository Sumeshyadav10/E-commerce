import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopByCategory from '../components/ShopByCategory';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-black'}`}>
     
      

      <HeroSection />
      <ShopByCategory />
      
    </div>
  );
};

export default HomePage;