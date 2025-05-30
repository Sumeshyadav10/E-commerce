import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';

const MainHomePage = () => {
  return (
    <div className="bg-white dark:bg-black transition-all duration-300">
      <Navbar />
      <HeroSection />
      <FeatureSection />
    </div>
  );
};

export default MainHomePage;
