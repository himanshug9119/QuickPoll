import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../components/Loader"; // Ensure you have this component

const ChangePassword = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // State variables for form inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // State variables for show/hide password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // State variables for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handler for form submission
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic client-side validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New Password and Confirm New Password do not match.");
      return;
    }

    // Optional: Add more validation (e.g., password strength)

    try {
      setLoading(true);
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`, // Assuming you use JWT
        },
        body: JSON.stringify({
          username: currentUser.username,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(data.message || "Failed to change password.");
      }

      setSuccess("Password changed successfully.");
      // Optionally, redirect after a short delay
      setTimeout(() => {
        navigate(`/profile/${currentUser.username}`);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler for cancel button
  const handleCancel = () => {
    navigate(`/profile/${currentUser.username}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-8 border border-gray-300 rounded-lg bg-gray-50 shadow-lg">
      <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
        Change Password
      </h2>

      {loading ? (
        <Loader /> // Display loader while submitting
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              aria-label="Toggle Current Password Visibility"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              aria-label="Toggle New Password Visibility"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              aria-label="Toggle Confirm New Password Visibility"
            >
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-green-500 text-sm text-center">{success}</div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
            <button
              type="submit"
              className="mb-2 md:mb-0 md:w-1/2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="md:w-1/2 p-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
