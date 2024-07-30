import React from 'react';
import { useParams } from 'react-router-dom';
import PollSection from '../components/PollSection';
import CommentSection from '../components/CommentSection';
import mockPolls from '../data/mockPollsData';
const Poll = () => {
  const { id } = useParams();
  const pollId = Number(id);
  const poll = mockPolls.find((poll) => poll.id === pollId);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <PollSection poll={poll} />
        <CommentSection pollId={pollId} />
      </div>
    </div>
  );
};

export default Poll;
