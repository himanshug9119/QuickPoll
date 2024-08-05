import React, { useState } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSignUpPage = location.pathname === "/sign-up";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.username}`);
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
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
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
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-white hover:underline"
          >
            About
          </Link>
          {currentUser && location.pathname !== "/create-poll" && (
            <Link
              to="/create-poll"
              className="text-gray-300 hover:text-white hover:underline"
            >
              Create Poll
            </Link>
          )}
          {currentUser && (
            <div className="flex items-center gap-4">
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-blue-500 cursor-pointer"
                src={currentUser.avatar}
                alt="profile"
                onClick={handleProfileClick}
              />
              <div className="relative group">
                <FaSignOutAlt
                  onClick={handleLogout}
                  className="cursor-pointer text-gray-300 hover:text-white"
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Logout
                </span>
              </div>
            </div>
          )}
          {!currentUser && (
            <Link to={isSignUpPage ? "/sign-in" : "/sign-up"}>
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
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={handleMenuClose}
          >
            <FaTimes />
          </button>
          <div className="flex flex-col items-center gap-4 text-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:underline text-xl"
              onClick={handleMenuClose}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white hover:underline text-xl"
              onClick={handleMenuClose}
            >
              About
            </Link>
            {currentUser && location.pathname !== "/create-poll" && (
              <Link
                to="/create-poll"
                className="text-gray-300 hover:text-white hover:underline text-xl"
                onClick={handleMenuClose}
              >
                Create Poll
              </Link>
            )}
            {currentUser ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  className="rounded-full h-12 w-12 object-cover border-2 border-blue-500 cursor-pointer"
                  src={currentUser.avatar}
                  alt="profile"
                  onClick={handleProfileClick}
                />
                <div className="relative group">
                  <FaSignOutAlt
                    onClick={handleLogout}
                    className="cursor-pointer text-gray-300 hover:text-white text-2xl"
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Logout
                  </span>
                </div>
              </div>
            ) : (
              <Link to={isSignUpPage ? "/sign-in" : "/sign-up"}>
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
