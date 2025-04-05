import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen px-4 py-10 flex items-center justify-center ${darkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-all duration-300
        ${darkMode ? 'bg-[#1f1f1f] border border-gray-700' : 'bg-white border border-gray-200'}`}>
        
        <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2
                ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600'}`}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2
                ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600'}`}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2
                ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600'}`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-medium bg-cyan-600 hover:bg-cyan-500 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6">
  Already have an account? <Link to="/login" className="text-cyan-500 hover:underline">Login</Link>
</p>

      </div>
    </div>
  );
};

export default RegisterPage;
