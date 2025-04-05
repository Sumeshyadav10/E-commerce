import {
    Mail, MapPin, Phone, Linkedin, Twitter, Youtube, Facebook, Instagram
  } from "lucide-react";
  
  const Footer = () => {
    return (
      <footer className="bg-[#111827] text-gray-300 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Info</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Address: VCET VASAI</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>TELEPHONE: +91-9998316913</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>Email: Info@VoltaVision.Com</span>
              </li>
            </ul>
          </div>
  
          {/* Pages */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Pages</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Shop</li>
            </ul>
          </div>
  
          {/* Social */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Social</h2>
            <div className="flex gap-4">
              <Linkedin className="w-5 h-5 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-white cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
  
        {/* Divider and copyright */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
          © 2024 All Rights Reserved | Volt Vision
        </div>
      </footer>
    );
  };
  
  export default Footer;
  