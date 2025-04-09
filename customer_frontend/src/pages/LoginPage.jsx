import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginPage = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      await login(formData); // Use login function from AuthContext
      navigate("/"); // Redirect to homepage after successful login
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 flex items-center justify-center ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-all duration-300 ${
          darkMode
            ? "bg-[#1f1f1f] border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2 ${
                darkMode
                  ? "bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg outline-none transition focus:ring-2 ${
                darkMode
                  ? "bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-cyan-500"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-cyan-600"
              }`}
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
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;