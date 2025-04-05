import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    // Handle login logic here (API call, etc.)
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className={`min-h-screen px-4 py-10 flex items-center justify-center ${darkMode ? 'bg-[#121212] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-all duration-300
        ${darkMode ? 'bg-[#1f1f1f] border border-gray-700' : 'bg-white border border-gray-200'}`}>
        
        <h2 className="text-3xl font-semibold text-center mb-6">Login to Your Account</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2
                ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600'}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2
                ${darkMode ? 'bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500' 
                          : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600'}`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-medium bg-cyan-600 hover:bg-cyan-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account? <Link to="/register" className="text-cyan-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
