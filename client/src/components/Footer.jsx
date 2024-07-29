import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Navigation Links */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">QuickPoll</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">Home</Link>
              </li>
              <li>
                <Link to="/create-poll" className="hover:text-gray-400">Create Poll</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} QuickPoll. All rights reserved.</p>
          <p className="text-xs mt-2">Created with love by Himanshu Gupta</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
