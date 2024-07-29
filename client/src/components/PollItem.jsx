import React from 'react';
import { useNavigate } from 'react-router-dom';

const PollItem = ({ poll, created }) => {
  const navigate = useNavigate();

  const handleQuestionClick = () => {
    navigate(`/poll/${poll.id}`, { state: { poll } });
  };

  const handleResults = () => {
    navigate(`/results/${poll.id}`, { state: { poll } });
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-4 cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={handleQuestionClick}
        >
          {poll.question}
        </div>
        <ul className="space-y-2">
          {poll.options.map((option, index) => (
            <li key={index} className="border border-gray-300 p-2 rounded-md bg-gray-100">
              <span className="text-gray-800">{option}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        {created && (
          <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
            Delete
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleResults}
        >
          View Results
        </button>
      </div>
    </div>
  );
};

export default PollItem;
