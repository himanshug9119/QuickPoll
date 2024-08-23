import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PollResults = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState({
    votesCount: {},
    totalVotes: 0,
    votes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const pollResponse = await fetch(`/api/poll/get/${pollId}`);
        if (pollResponse.ok) {
          const pollData = await pollResponse.json();
          setPoll(pollData);
        } else {
          console.error("Failed to fetch poll data");
        }
      } catch (error) {
        console.error("Error fetching poll data:", error);
      }
    };

    const fetchResultsData = async () => {
      try {
        const resultsResponse = await fetch(`/api/poll/getResult/${pollId}`);
        if (resultsResponse.ok) {
          const resultsData = await resultsResponse.json();
          setResults(
            resultsData || {
              votesCount: {},
              totalVotes: 0,
              votes: [],
            }
          );
        } else {
          console.error("Failed to fetch results data");
        }
      } catch (error) {
        console.error("Error fetching results data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
    fetchResultsData();
  }, [pollId]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading results...</p>;
  }

  if (!poll) {
    return (
      <p className="text-center text-red-500">
        No poll data available. Please try again.
      </p>
    );
  }

  const options = poll.options || [];
  const votesCount = results.votesCount || {};
  const totalVotes = results.totalVotes || 0;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Result Analysis
        </h2>
        <div className="text-gray-700 mb-2 text-lg font-semibold">
          Created By -{" "}
          {poll.createdBy && (
            <Link
              to={`/profile/${poll.createdBy._id}`}
              className="text-blue-500 hover:underline"
            >
              {poll.createdBy.username}
            </Link>
          )}
        </div>
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Question - {poll.question || "Poll Results"}
        </h1>

        {/* For larger screens */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
          <div className="col-span-1">
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center pb-2">
                  <div className="text-lg font-semibold text-gray-700">
                    {option.optionText}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <div className="space-y-4">
              {options.map((option, index) => {
                const votes = votesCount[option._id] || 0;
                const percentage = totalVotes
                  ? ((votes / totalVotes) * 100).toFixed(1)
                  : 0;

                return (
                  <div key={index} className="flex items-center pb-3">
                    <div className="relative w-full bg-gray-200 rounded-full overflow-hidden h-6">
                      <div
                        className={`absolute left-0 top-0 h-full ${
                          votes > 0 ? "bg-blue-500" : "bg-gray-300"
                        } text-black text-xs font-semibold flex items-center pl-2`}
                        style={{ width: `${percentage}%` }}
                      >
                        {votes > 0 ? `${percentage}% (${votes})` : "0.0% (0)"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* For smaller screens */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {options.map((option, index) => {
              const votes = votesCount[option._id] || 0;
              const percentage = totalVotes
                ? ((votes / totalVotes) * 100).toFixed(1)
                : 0;

              return (
                <div key={index} className="flex flex-col mb-4">
                  <div className="text-lg font-semibold text-gray-700 mb-1">
                    {option.optionText}
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full overflow-hidden h-6">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        votes > 0 ? "bg-blue-500" : "bg-gray-300"
                      } text-black text-xs font-semibold flex items-center pl-2`}
                      style={{ width: `${percentage}%` }}
                    >
                      {votes > 0 ? `${percentage}% (${votes})` : "0.0% (0)"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-gray-600 mt-4 text-center">
          Total Votes: {totalVotes}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Results Section
        </h2>
        <div className="overflow-auto">
          {/* For larger screens */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 text-center">
            {options.map((option, index) => (
              <div key={index} className="font-bold text-gray-800">
                {option.optionText}
              </div>
            ))}
          </div>
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 mt-2">
            {options.map((option, index) => {
              const voters =
                results.votes?.filter((vote) => vote.optionId === option._id) ||
                [];

              return (
                <div key={index} className="border-t pt-2 text-center">
                  {voters.length > 0 ? (
                    voters.map((voter, i) => (
                      <div key={i} className="text-gray-700 mb-1">
                        <Link
                          to={`/profile/${voter._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {voter.username}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600">No voters</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* For smaller screens */}
          <div className="lg:hidden">
            {options.map((option, index) => {
              const voters =
                results.votes?.filter((vote) => vote.optionId === option._id) ||
                [];

              return (
                <div key={index} className="border-t pt-2 mb-4">
                  <h3 className="font-bold text-gray-800 text-center mb-2">
                    {option.optionText}
                  </h3>
                  {voters.length > 0 ? (
                    voters.map((voter, i) => (
                      <div key={i} className="text-gray-700 text-center mb-1">
                        <Link
                          to={`/profile/${voter._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {voter.username}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600 text-center">No voters</div>
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
