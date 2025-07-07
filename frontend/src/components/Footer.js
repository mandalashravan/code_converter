import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-950 via-gray-900 to-black text-gray-400 py-4 mt-8 border-t border-gray-700">
      <div className="container mx-auto px-4 md:px-8 text-center space-y-2">
        {/* Brand Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold font-heading">
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            &copy; {new Date().getFullYear()} Code Converter
          </span>
          <span className="hidden sm:inline-block text-gray-500">|</span>
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            AI-powered syntax translator
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-sans">
          <Link to="/" className="hover:shadow-[0_0_8px_2px_#a259ff] transition bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Home
          </Link>
          <Link to="/convert" className="hover:shadow-[0_0_8px_2px_#a259ff] transition bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Convert
          </Link>
          <Link to="/login" className="hover:shadow-[0_0_8px_2px_#a259ff] transition bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Login
          </Link>
          <Link to="/register" className="hover:shadow-[0_0_8px_2px_#a259ff] transition bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">
            Register
          </Link>
        </div>

        {/* Attribution */}
        <p className="text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 font-sans">
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">Made with</span>
          <span className="inline-block bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent" style={{ fontSize: "1.1em", filter: "drop-shadow(0 0 6px #a259ff)" }}>💜</span>
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent">for developers and curious minds across the globe.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
