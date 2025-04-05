import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import UserNavbar from './components/UserNavbar';
import Footer from './components/Footer';

const App = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;