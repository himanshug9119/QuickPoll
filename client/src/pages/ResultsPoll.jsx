import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PollResults = () => {
  const location = useLocation();
  const poll = location.state?.poll;

  if (!poll) {
    return <p className="text-center text-red-500">No poll data available. Please try again.</p>;
  }

  const options = poll.options || [];
  const votesCount = options.reduce((acc, _, index) => {
    const count = poll.answeredBy.filter(answer => answer.option === index).length;
    acc[index] = count;
    return acc;
  }, {});

  const totalVotes = Object.values(votesCount).reduce((sum, count) => sum + count, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{poll.question || "Untitled Poll"}</h2>
      <div className="space-y-4">
        {options.map((option, index) => {
          const votes = votesCount[index] || 0;
          const percentage = totalVotes ? ((votes / totalVotes) * 100).toFixed(1) : 0;

          return (
            <div key={index} className="flex items-center mb-2">
              <div className="relative w-full bg-gray-200 rounded-full overflow-hidden h-8">
                <div
                  className="absolute left-0 top-0 h-full bg-blue-500 text-white text-sm font-semibold flex items-center pl-3"
                  style={{ width: `${percentage}%`, minWidth: '2rem' }}
                >
                  {percentage > 0 ? option : ''}
                </div>
                {percentage === 0 && (
                  <span className="absolute inset-0 flex items-center pl-3 text-gray-700 text-sm font-semibold">
                    {option}
                  </span>
                )}
              </div>
              <span className="ml-4 text-gray-700 font-medium">{percentage}%</span>
            </div>
          );
        })}
      </div>
      <p className="text-gray-600 mt-4 text-center">Total Votes: {totalVotes}</p>
      <div className="mt-6">
        {options.map((option, index) => {
          const voters = poll.answeredBy.filter(answer => answer.option === index).map(answer => answer.user);
          return (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg">{`Option ${index + 1} (${votesCount[index] || 0} votes)`}</h3>
              <ul className="list-disc list-inside pl-5 text-gray-700">
                {voters.map((voter, i) => (
                  <li key={i}>
                    <Link to={`/profile/${voter}`} className="text-blue-500 hover:underline">
                      {voter}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResults;
