import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../api/axiosInstance"; // Use the existing axios instance

const SendMessagePage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    message: "", // Only message is required as customerId is derived from the token
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Send the message to the backend
      const response = await axiosInstance.post("/messages/send", formData); // Use axiosInstance
      setSuccess(response.data.message); // Display success message from the response
      setFormData({ message: "" }); // Clear the form
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className={`min-h-screen px-4 py-10 flex items-center justify-center ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-2xl shadow-xl ${
          darkMode ? "bg-[#1f1f1f]" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Send us a Message
        </h2>
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <textarea
            id="message"
            rows="4"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              darkMode ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-gray-900"
            }`}
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessagePage;