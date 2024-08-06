import React, { useEffect, useState } from 'react';
import PollItem from './PollItem';

const PollList = ({ type, userId, ownProfile}) => {
  const [polls, setPolls] = useState([]);
  
  useEffect(() => {
    let endpoint = '';

    switch (type) {
      case 'created':
        endpoint = `/api/poll/created/${userId}`;
        break;
      case 'answered':
        endpoint = `/api/poll/answered/${userId}`;
        break;
      case 'liked':
        endpoint = `/api/poll/liked/${userId}`;
        break;
      case 'commented':
        endpoint = `/api/poll/commented/${userId}`;
        break;
      default:
        break;
    }
    console.log(endpoint);
    if (!endpoint) {
      alert('Invalid poll type');
    }
    const fetchPolls = async (endpoint) => {
      if (!endpoint) return;
    
      try {
        console.log(endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error fetching ${type} polls: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setPolls(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    // Example usage
    fetchPolls(endpoint);
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
              ownProfile={ownProfile}
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
