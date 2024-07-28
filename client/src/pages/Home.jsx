import React, { useEffect, useState } from 'react';
import { mockPolls } from '../data/mockPollsData';
import PollItem from '../components/PollItem';

const Home = () => {
  const [allPolls, setAllPolls] = useState([]);
  useEffect(() => {
    // Replace 'user1' with the actual logged-in user ID
    const currentUser = 'alice_j';
    setAllPolls(mockPolls);
  }, []);

  return (
    <div className="m-2 p-2 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 ">Welcome to the Polling System</h1>

      <div className="poll-section mb-8">
        <h2 className="text-xl font-semibold mb-2">Let's Get started with the Polls - </h2>
        {allPolls.length === 0 ? (
          <p>No polls available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-auto overflow-y-auto">
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
