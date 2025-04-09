import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-10 px-4 md:px-16 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">VoltVision</h3>
          <p className="text-sm">
            Powering innovation with smart electrical solutions. Trusted across
            industries for safety, performance, and sustainability.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Facebook className="w-5 h-5 cursor-pointer" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <Instagram className="w-5 h-5 cursor-pointer" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <Twitter className="w-5 h-5 cursor-pointer" />
            </a>
            <a
              href="mailto:support@voltvision.com"
              className="hover:text-red-500"
            >
              <Mail className="w-5 h-5 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:underline">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">
                Shop Now
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shop?category=household-wires" className="hover:underline">
                Household Wires
              </Link>
            </li>
            <li>
              <Link to="/shop?category=switchgear" className="hover:underline">
                SwitchGear
              </Link>
            </li>
            <li>
              <Link to="/shop?category=hand-tools" className="hover:underline">
                Hand Tools
              </Link>
            </li>
            <li>
              <Link to="/shop?category=solar-panel" className="hover:underline">
                Solar Panel
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:support@voltvision.com" className="hover:underline">
                Email: support@voltvision.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="hover:underline">
                Phone: +91-9876543210
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps?q=Mumbai,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Location: Mumbai, India
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`mt-10 text-center text-xs border-t pt-4 ${
          darkMode ? 'border-gray-700' : 'border-gray-400'
        }`}
      >
        &copy; {new Date().getFullYear()} VoltVision. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;