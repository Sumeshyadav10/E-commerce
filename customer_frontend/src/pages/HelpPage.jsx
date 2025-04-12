import React from "react";
import { useTheme } from "../context/ThemeContext";

const HelpPage = () => {
  const { darkMode } = useTheme();

  const cardStyle = `rounded-2xl shadow-md p-6 border transition-all ${
    darkMode
      ? "bg-[#1f1f1f] border-gray-700 text-white"
      : "bg-white border border-gray-200 text-gray-900"
  }`;

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Help & Support</h1>

        {/* Grid layout for first 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card 1: Account Help */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">👤 Account Help</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Register a new account via the Register page.</li>
              <li>Ensure your email & password are correct when logging in.</li>
              <li>Need help? Contact support for password reset.</li>
            </ul>
          </div>

          {/* Card 2: Orders & Shipping */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">📦 Orders & Shipping</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>You'll receive an email after placing your order.</li>
              <li>Shipping times depend on your location and are shown at checkout.</li>
              <li>Track your orders on the “Orders” page anytime.</li>
            </ul>
          </div>

          {/* Card 3: Returns & Refunds */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">🔁 Returns & Refunds</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Return items within 7 days of receiving them.</li>
              <li>Refunds take 5–7 business days after approval.</li>
              <li>For damaged/incorrect items, reach out to support.</li>
            </ul>
          </div>

          {/* Card 4: Wishlist & Cart */}
          <div className={cardStyle}>
            <h2 className="text-2xl font-semibold mb-4">🛒 Wishlist & Cart</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Add items to your cart for instant purchase.</li>
              <li>Use the wishlist to save products you love.</li>
              <li>Both sync across devices when you’re logged in.</li>
            </ul>
          </div>
        </div>

        {/* Final full-width section: Need More Help */}
        <section
          className={`rounded-2xl p-6 text-lg text-center border shadow-md ${
            darkMode
              ? "bg-[#1f1f1f] border-gray-700 text-white"
              : "bg-white border border-gray-200 text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-3">📞 Need More Help?
          </h2>
          <p>
            If your issue isn't listed above, feel free to reach out to our support team at{" "}
            
            <a
              href="mailto:support@voltvision.com"
              className="text-cyan-500 underline"
            >
              support@voltvision.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
