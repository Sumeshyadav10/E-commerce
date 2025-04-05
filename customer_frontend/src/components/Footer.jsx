import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">VoltVision</h3>
          <p className="text-sm">
            Powering innovation with smart electrical solutions. Trusted across industries for safety, performance, and sustainability.
          </p>
          <div className="flex space-x-4 mt-4">
            <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-sky-400 cursor-pointer" />
            <Mail className="w-5 h-5 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Products</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Household Wires</li>
            <li className="hover:underline cursor-pointer">SwitchGear</li>
            <li className="hover:underline cursor-pointer">Hand Tools</li>
            <li className="hover:underline cursor-pointer">Solar Panel</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@voltvision.com</li>
            <li>Phone: +91-9876543210</li>
            <li>Location: Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs border-t pt-4 border-gray-400">
        &copy; {new Date().getFullYear()} VoltVision. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
