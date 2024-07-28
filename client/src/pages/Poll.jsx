import React from 'react';
import { useLocation } from 'react-router-dom';
import PollSection from '../components/PollSection';
import CommentSection from '../components/CommentSection';

const Poll = () => {
  const location = useLocation();
  const poll = location.state?.poll; // Safely access the poll object

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <PollSection poll={poll} />
        <CommentSection pollId={poll?.id} />
      </div>
    </div>
  );
};

export default Poll;
