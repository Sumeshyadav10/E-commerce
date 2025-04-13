import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../api/axiosInstance";

const SendMessagePage = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });
  const [attachments, setAttachments] = useState([]); // State for attachments
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]); // Add selected files to the list
  };

  const handleRemoveFile = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index); // Remove the file at the given index
    setAttachments(updatedAttachments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("content", formData.content);

      // Append files if any are selected
      attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      // Send the message to the backend
      const response = await axiosInstance.post("/messages", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Message sent successfully!");
      setFormData({ subject: "", content: "" });
      setAttachments([]); // Clear attachments
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Send a Message</h2>
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={`w-full p-3 rounded-lg border ${
              darkMode ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-gray-900"
            }`}
          />
          <textarea
            id="content"
            rows="4"
            placeholder="Your message..."
            value={formData.content}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              darkMode ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-gray-900"
            }`}
            required
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg border bg-gray-100 text-gray-900"
          />
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
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