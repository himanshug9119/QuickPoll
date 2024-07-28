import React, { useState } from 'react';

const PollSection = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');

  if (!poll) {
    return <p className="text-center text-red-500">No poll data found. Please navigate from the poll list.</p>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      alert(`You voted for: ${selectedOption}`);
      // Handle vote submission
    } else {
      alert('Please select an option before submitting.');
    }
  };

  return (
    <div className="p-8 border-b border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{poll.question}</h1>
      <form onSubmit={handleSubmit}>
        {poll.options.map((option, index) => (
          <label key={index} className="block mb-4 flex items-center cursor-pointer">
            <input
              type="radio"
              name="pollOption"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-lg text-gray-700">{option}</span>
          </label>
        ))}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            Vote
          </button>
        </div>
      </form>
    </div>
  );
};

export default PollSection;
