import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PollItem from '../components/PollItem';
import { useSelector } from 'react-redux';

const Home = () => {
  const [allPolls, setAllPolls] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('/api/poll/get');
        if (!response.ok) {
          throw new Error('Failed to fetch polls');
        }
        const data = await response.json();
        setAllPolls(data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  const handleCreatePoll = () => navigate('/create-poll');
  const handleSignUp = () => navigate('/sign-up');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Ultimate Polling Experience!</h1>
          <p className="text-lg mb-6">
            Discover, participate, and create polls on a variety of topics. Engage with the community and see what others think!
          </p>
          {currentUser ? (
            <button
              onClick={handleCreatePoll}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Create a Poll
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Get Started
            </button>
          )}
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
              <PollItem key={poll._id} poll={poll} displayFirstAndLastOption={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
