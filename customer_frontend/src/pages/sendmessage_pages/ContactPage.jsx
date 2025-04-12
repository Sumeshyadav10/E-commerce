import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const { darkMode } = useTheme();

  const cardStyle = `p-6 rounded-lg shadow-md ${
    darkMode
      ? "bg-[#1f1f1f] text-white border border-gray-700"
      : "bg-white text-gray-800 border border-gray-200"
  }`;

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* General Inquiries */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">📧 General Inquiries</h2>
            <p className="text-lg mb-4">
              For general questions or feedback, feel free to email us at:
            </p>
            <a
              href="mailto:support@voltvision.com"
              className="text-cyan-500 font-semibold underline"
            >
              support@voltvision.com
            </a>
          </div>

          {/* Technical Support */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">🛠 Technical Support</h2>
            <p className="text-lg mb-4">
              Facing technical issues? Our support team is here to help. Reach out to:
            </p>
            <a
              href="mailto:techsupport@voltvision.com"
              className="text-cyan-500 font-semibold underline"
            >
              techsupport@voltvision.com
            </a>
          </div>

          {/* Sales Queries */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">💼 Sales Queries</h2>
            <p className="text-lg mb-4">
              Interested in our products or services? Contact our sales team at:
            </p>
            <a
              href="mailto:sales@voltvision.com"
              className="text-cyan-500 font-semibold underline"
            >
              sales@voltvision.com
            </a>
          </div>

          {/* Visit Us */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">📍 Visit Us</h2>
            <p className="text-lg mb-4">
              Our office is located at:
            </p>
            <p className="text-lg">
              123 VoltVision Street, <br />
              Tech City, TX 75001
            </p>
          </div>

          {/* Call Us */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">📞 Call Us</h2>
            <p className="text-lg mb-4">
              Need immediate assistance? Give us a call:
            </p>
            <p className="text-lg font-semibold">+1 (800) 123-4567</p>
          </div>

          {/* Send a Message */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">💬 Send a Message</h2>
            <p className="text-lg mb-4">
              Prefer to send us a message? Visit our{" "}
              <Link
                to="/send-message"
                className="text-cyan-500 font-semibold underline"
              >
                Send a Message page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;