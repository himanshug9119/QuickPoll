import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaShareAlt, FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const PollSection = () => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [liked, setLiked] = useState(false);
  const [voted, setVoted] = useState(false);
  const navigate = useNavigate();
  const { pollId } = useParams();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(`/api/poll/get/${pollId}`);
        if (response.ok) {
          const data = await response.json();
          setPoll(data);
        } else {
          console.error('Failed to fetch poll data');
        }
      } catch (error) {
        console.error('Error fetching poll data:', error);
      }
    };

    fetchPoll();
  }, [pollId]);

  if (!poll) {
    return <p className="text-center text-red-500">No poll data found. Please navigate from the poll list.</p>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption) {
      setVoted(true);
      alert(`You voted for: ${selectedOption}`);
      // Handle vote submission, then navigate to results page
      navigate(`/results/${poll._id}`);
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
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{poll.question}</h1>
      
      <div className="flex items-center mb-4">
        <FaUser className="text-gray-500 mr-2" />
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/profile/${poll.createdBy._id}`)}
        >
          {poll.createdBy.username}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {poll.options.map((option) => (
            <label
              key={option._id}
              className={`block p-4 rounded-md border cursor-pointer transition-colors duration-300 ${
                selectedOption === option._id
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <input
                type="radio"
                name="pollOption"
                value={option._id}
                checked={selectedOption === option._id}
                onChange={handleOptionChange}
                className="hidden"
              />
              <span className="text-lg">{option.optionText}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleShare}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
              title="Share Poll"
            >
              <FaShareAlt className="inline-block" />
            </button>
            <button
              type="button"
              onClick={toggleLike}
              className="text-gray-700 transition duration-300 ease-in-out"
              title="Like Poll"
            >
              <FaThumbsUp className={`w-6 h-6 ${liked ? 'text-blue-600' : 'text-gray-400'}`} />
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            title={voted ? 'View Results' : 'Vote'}
          >
            {voted ? 'View Results' : 'Vote'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PollSection;
