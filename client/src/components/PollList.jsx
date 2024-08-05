import React, { useEffect, useState } from 'react';
import PollItem from './PollItem';

const PollList = ({ type, userId }) => {
  const [polls, setPolls] = useState([]);
  
  useEffect(() => {
    let endpoint = '';

    switch (type) {
      case 'created':
        endpoint = `/api/polls/created/${userId}`;
        break;
      case 'answered':
        endpoint = `/api/polls/answered/${userId}`;
        break;
      case 'liked':
        endpoint = `/api/polls/liked/${userId}`;
        break;
      case 'commented':
        endpoint = `/api/polls/commented/${userId}`;
        break;
      default:
        break;
    }

    if (endpoint) {
      fetch(endpoint)
        .then(response => response.json())
        .then(data => setPolls(data))
        .catch(error => console.error(`Error fetching ${type} polls:`, error));
    }
  }, [type, userId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-semibold mb-4">
        {type.charAt(0).toUpperCase() + type.slice(1)} Polls
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {polls.length > 0 ? (
          polls.map(poll => (
            <PollItem
              key={poll.id}
              poll={poll}
              created={type === 'created'}
            />
          ))
        ) : (
          <p className="text-gray-600">No polls {type}.</p>
        )}
      </div>
    </div>
  );
};

export default PollList;
