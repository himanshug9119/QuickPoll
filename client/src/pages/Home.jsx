import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { mockPolls } from '../data/mockPollsData';
import PollItem from '../components/PollItem';

const Home = () => {
  const [allPolls, setAllPolls] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Replace 'user1' with the actual logged-in user ID
    const currentUser = 'alice_j';
    setAllPolls(mockPolls);
  }, []);

  const handleCreatePoll = () => {
    navigate('/create-poll');  // Navigate to /create-poll
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Ultimate Polling Experience!</h1>
          <p className="text-lg mb-6">
            Discover, participate, and create polls on a variety of topics. Engage with the community and see what others think!
          </p>
          <button 
            onClick={handleCreatePoll}  // Add onClick handler
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            Create a Poll
          </button>
        </div>
      </div>

      {/* Poll Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Explore Our Latest Polls</h2>
        {allPolls.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No polls available. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allPolls.map(poll => (
              <PollItem key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
