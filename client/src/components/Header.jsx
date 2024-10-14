import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSignUpPage = location.pathname === "/sign-up";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVisitProfile = () => {
    navigate(`/profile/${currentUser.username}`);
    setIsDropdownOpen(false);
    handleMenuClose();
  };

  const handleChangePasswordClick = () => {
    navigate(`/change-password`);
    setIsDropdownOpen(false);
    handleMenuClose();
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      alert(data)
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 shadow-md text-white w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-xl flex items-center gap-1">
            <span className="text-blue-300">Quick</span>
            <span className="text-blue-500">Poll</span>
          </h1>
        </Link>
        <div className="hidden md:flex md:items-center md:gap-6 md:ml-auto">
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:underline transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white hover:underline transition duration-200"
          >
            About
          </Link>
          {currentUser && location.pathname !== "/create-poll" && (
            <Link
              to="/create-poll"
              className="text-gray-300 hover:text-white hover:underline transition duration-200"
            >
              Create Poll
            </Link>
          )}
          {currentUser && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <img
                  className="rounded-full h-8 w-8 object-cover border-2 border-blue-500 cursor-pointer transition duration-200 transform hover:scale-105"
                  src={currentUser.avatar}
                  alt="profile"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 animate-fade-in">
                  <button
                    onClick={handleVisitProfile}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
                  >
                    Visit Profile
                  </button>
                  <button
                    onClick={handleChangePasswordClick}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!currentUser && (
            <Link to={isSignUpPage ? "/sign-in" : "/sign-up"}>
              <span className="text-gray-300 hover:text-white hover:underline transition duration-200">
                {isSignUpPage ? "Sign In" : "Sign Up"}
              </span>
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-95 flex flex-col items-center pt-24 md:hidden z-40 overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
            onClick={handleMenuClose}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <div className="flex flex-col items-center gap-6 text-center px-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:underline text-2xl transition duration-200"
              onClick={handleMenuClose}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white hover:underline text-2xl transition duration-200"
              onClick={handleMenuClose}
            >
              About
            </Link>
            {currentUser && location.pathname !== "/create-poll" && (
              <Link
                to="/create-poll"
                className="text-gray-300 hover:text-white hover:underline text-2xl transition duration-200"
                onClick={handleMenuClose}
              >
                Create Poll
              </Link>
            )}
            {currentUser ? (
              <div className="flex flex-col items-center gap-4 mt-6 w-full">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full h-12 w-12 object-cover border-2 border-blue-500 cursor-pointer transition duration-200 transform hover:scale-105"
                    src={currentUser.avatar}
                    alt="profile"
                    onClick={handleProfileClick}
                  />
                  <span className="text-white font-semibold">
                    {currentUser.username}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 mt-4 w-full">
                  <button
                    onClick={() => {
                      handleVisitProfile();
                      handleMenuClose();
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Visit Profile
                  </button>
                  <button
                    onClick={() => {
                      handleChangePasswordClick();
                      handleMenuClose();
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to={isSignUpPage ? "/sign-in" : "/sign-up"}>
                <span className="text-gray-300 hover:text-white hover:underline text-2xl transition duration-200">
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
