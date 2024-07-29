import React from 'react';
import { useParams, Link } from 'react-router-dom';
import mockPollData from '../data/mockPollsData'; // Adjust path if needed

const PollResults = () => {
  const { id } = useParams();
  const poll = mockPollData.find(p => p.id === parseInt(id, 10));

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
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Result Analysis</h2>
        <div className="text-gray-700 mb-2 text-lg font-semibold "> Created By -
          <Link to={`/profile/${poll.createdBy}`} className="text-blue-500 hover:underline ">
            {poll.createdBy}
          </Link>
        </div>
        <h1 className="text-xl font-bold mb-8 text-gray-800">Question - {poll.question || "Poll Results"}</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center pb-2">
                  <div className="text-lg font-semibold text-gray-700 ">{option}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <div className="space-y-4">
              {options.map((option, index) => {
                const votes = votesCount[index] || 0;
                const percentage = totalVotes ? ((votes / totalVotes) * 100).toFixed(1) : 0;

                return (
                  <div key={index} className="flex items-center pb-3">
                    <div className="relative w-full bg-gray-200 rounded-full overflow-hidden h-6">
                      <div
                        className={`absolute left-0 top-0 h-full ${votes > 0 ? 'bg-blue-500' : 'bg-gray-200'} text-black text-xs font-semibold flex items-center pl-2`}
                        style={{ width: `${votes > 0 ? percentage : 20}%` }}
                      >
                        {votes > 0 ? `${percentage}% (${votes})` : '0.0% (0)'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-center">Total Votes: {totalVotes}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Results Section</h2>
        <div className="overflow-auto">
          <div className="grid grid-cols-4 gap-4 text-center">
            {options.map((option, index) => (
              <div key={index} className="font-bold text-gray-800">{option}</div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {options.map((_, index) => {
              const voters = poll.answeredBy.filter(answer => answer.option === index).map(answer => answer.user);
              return (
                <div key={index} className="border-t pt-2 text-center">
                  {voters.length > 0 ? voters.map((voter, i) => (
                    <div key={i} className="text-gray-700 mb-1">
                      <Link to={`/profile/${voter}`} className="text-blue-500 hover:underline ">
                        {voter}
                      </Link>
                    </div>
                  )) : (
                    <div className="text-gray-600">No voters</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
