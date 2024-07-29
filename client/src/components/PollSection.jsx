import React, { useState } from 'react';
import { FaThumbsUp, FaShareAlt } from 'react-icons/fa';

const PollSection = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [liked, setLiked] = useState(false);

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

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Poll',
      text: poll.question,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Web Share API is not supported in your browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{poll.question}</h1>
      <form onSubmit={handleSubmit}>
        {poll.options.map((option, index) => (
          <label
            key={index}
            className={`block mb-4 p-3 rounded-md border cursor-pointer transition-colors duration-300 ${
              selectedOption === option ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="pollOption"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="hidden"
            />
            <span className="text-lg">{option}</span>
          </label>
        ))}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleShare}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              <FaShareAlt />
            </button>
            <button
              type="button"
              onClick={toggleLike}
              className="text-gray-700 transition duration-300 ease-in-out"
            >
              <FaThumbsUp className={`w-6 h-6 ${liked ? 'text-blue-600' : 'text-gray-400'}`} />
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Vote
          </button>
        </div>
      </form>
    </div>
  );
};

export default PollSection;
