import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import HomePage from './pages/HomePage';

const AppContent = () => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      className={`min-h-screen ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HomePage />
     
     
    </motion.div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <AppContent />
        
      </AnimatePresence>
    
    </ThemeProvider>
  );
};

export default App;