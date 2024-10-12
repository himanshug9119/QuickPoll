import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <img
        src="https://via.placeholder.com/400x300?text=404+Not+Found" // Replace with an appropriate image
        alt="404 Not Found"
        className="mb-4 rounded-lg shadow-lg"
      />
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default PageNotFound;
