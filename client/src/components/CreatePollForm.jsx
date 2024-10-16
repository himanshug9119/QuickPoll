import React, { useState } from "react";
import {
  FaTrashAlt,
  FaUndoAlt,
  FaPlus,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import Loader from "./Loader"; // Assume you have a Loader component

const PollForm = ({
  question,
  options,
  addOption,
  handleOptionChange,
  handleDeleteOption,
  handleUndoDelete,
  deletedOptions,
  setStep,
  handleSubmit,
  error,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(e); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        {loading ? (
          <div className="flex justify-center">
            <Loader /> {/* Display loader while submitting */}
          </div>
        ) : (
          <>
            <div className="border border-gray-300 rounded-md p-4 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">Poll Question</h3>
              <p className="text-gray-700">{question}</p>
            </div>
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  required
                  disabled={loading} // Disable input during loading
                />
                <button
                  type="button"
                  className={`ml-2 ${
                    options.length === 2
                      ? "text-gray-500"
                      : "text-red-500 hover:text-red-700"
                  }`}
                  onClick={() => handleDeleteOption(index)}
                  title={
                    options.length === 2
                      ? "At least 2 options are required"
                      : "Delete Option"
                  }
                  disabled={options.length === 2 || loading} // Disable button during loading
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                title="Back"
                disabled={loading} // Disable button during loading
              >
                <FaArrowLeft />
              </button>
              <button
                type="button"
                onClick={addOption}
                className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                title="Add Option"
                disabled={loading} // Disable button during loading
              >
                <FaPlus />
              </button>
              <button
                type="button"
                onClick={handleUndoDelete}
                className={`p-3 rounded-md transition-colors ${
                  deletedOptions.length > 0
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500"
                }`}
                disabled={deletedOptions.length === 0 || loading} // Disable button during loading
                title="Undo Delete"
              >
                <FaUndoAlt />
              </button>
              <button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                title="Create Poll"
                disabled={loading} // Disable button during loading
              >
                <FaCheck />
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default PollForm;
