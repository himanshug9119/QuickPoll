import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PollItem = ({ poll, ownProfile, displayFirstAndLastOption }) => {
  const navigate = useNavigate();

  const handleResults = () => {
    navigate(`/results/${poll._id}`, { state: { poll } });
  };

  const handleVote = () => {
    navigate(`/poll/${poll._id}`, { state: { poll } });
  };


  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4 cursor-pointer text-blue-600 hover:text-blue-800">
          <div className="relative">
            <span
              onClick={handleVote}
              className={"line-clamp-2"}
              title="Click to Open voting page"
            >
              {poll.question}...
            </span>
          </div>
        </div>
        <ul className="space-y-2">
          {displayFirstAndLastOption ? (
            <>
              <li className="border border-gray-300 p-2 rounded-md bg-gray-100">
                <span className="text-gray-800">
                  {poll.options[0].optionText}
                </span>
              </li>
              {poll.options.length > 2 && (
                <li title="Go to Voting Page to see more options" className="text-center text-gray-800">...</li>
              )}
              {poll.options.length > 1 && (
                <li className="border border-gray-300 p-2 rounded-md bg-gray-100">
                  <span className="text-gray-800">
                    {poll.options[poll.options.length - 1].optionText}
                  </span>
                </li>
              )}
            </>
          ) : (
            poll.options.map((option, index) => (
              <li
                key={index}
                className="border border-gray-300 p-2 rounded-md bg-gray-100"
              >
                <span className="text-gray-800">{option.optionText}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center border-t border-gray-200">
        <div className="flex space-x-4 items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={handleResults}
          >
            Results
          </button>
          <button
            className="bg-blue-700 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={handleVote}
          >
            Vote
          </button>
          {poll.likedBy && (
            <div className="text-gray-600 flex items-center">
              <i className="fas fa-thumbs-up text-blue-600 mr-2"></i>
              <span>{poll.likedBy.length}</span>
            </div>
          )}
        </div>
        {ownProfile && (
          <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PollItem;
