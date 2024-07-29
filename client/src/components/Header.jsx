import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const isSignUpPage = location.pathname === "/sign-up";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 shadow-md text-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-xl flex items-center gap-1">
            <span className="text-blue-300">Quick</span>
            <span className="text-blue-500">Poll</span>
          </h1>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-6 md:ml-auto">
          <Link to="/" className="text-gray-300 hover:text-white hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white hover:underline">
            About
          </Link>
          <Link to="/create-poll" className="text-gray-300 hover:text-white hover:underline">
            Create Poll
          </Link>
          <Link to={currentUser ? '/profile' : (isSignUpPage ? '/sign-in' : '/sign-up')}>
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-blue-500"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-gray-300 hover:text-white hover:underline">
                {isSignUpPage ? "Sign In" : "Sign Up"}
              </span>
            )}
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={handleMenuToggle}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-center pt-16 md:hidden">
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={handleMenuClose}>
            <FaTimes />
          </button>
          <div className="flex flex-col items-center gap-4 text-center">
            <Link to="/" className="text-gray-300 hover:text-white hover:underline text-xl" onClick={handleMenuClose}>
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white hover:underline text-xl" onClick={handleMenuClose}>
              About
            </Link>
            <Link to="/create-poll" className="text-gray-300 hover:text-white hover:underline text-xl" onClick={handleMenuClose}>
              Create Poll
            </Link>
            <Link to={currentUser ? '/profile' : (isSignUpPage ? '/sign-in' : '/sign-up')} className="text-gray-300 hover:text-white hover:underline text-xl" onClick={handleMenuClose}>
              {currentUser ? (
                <img
                  className="rounded-full h-12 w-12 object-cover border-2 border-blue-500"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <span className="text-gray-300 hover:text-white hover:underline">
                  {isSignUpPage ? "Sign In" : "Sign Up"}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
