import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSignUpPage = location.pathname === "/sign-up";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false) {
        dispatch(signOutUserFailure(data.message));
        return ;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
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
          {currentUser && (
            <Link to="/create-poll" className="text-gray-300 hover:text-white hover:underline">
              Create Poll
            </Link>
          )}
          {currentUser ? (
            <div className="relative">
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-blue-500 cursor-pointer"
                src={currentUser.avatar}
                alt="profile"
                onClick={handleDropdownToggle}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-40">
                  <Link
                    to={`/profile/${currentUser.username}`}
                    className="block px-4 py-2 hover:bg-gray-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={isSignUpPage ? '/sign-in' : '/sign-up'}>
              <span className="text-gray-300 hover:text-white hover:underline">
                {isSignUpPage ? "Sign In" : "Sign Up"}
              </span>
            </Link>
          )}
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
            {currentUser ? (
              <div className="relative">
                <img
                  className="rounded-full h-12 w-12 object-cover border-2 border-blue-500 cursor-pointer"
                  src={currentUser.avatar}
                  alt="profile"
                  onClick={handleDropdownToggle}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-40">
                    <Link
                      to={`/profile/${currentUser.username}`}
                      className="block px-4 py-2 hover:bg-gray-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={isSignUpPage ? '/sign-in' : '/sign-up'}>
                <span className="text-gray-300 hover:text-white hover:underline">
                  {isSignUpPage ? "Sign In" : "Sign Up"}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
