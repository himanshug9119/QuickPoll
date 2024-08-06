import React from 'react';
import PollSection from '../components/PollSection';
import CommentSection from '../components/CommentSection';

const Poll = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <PollSection/>
        <CommentSection/>
      </div>
    </div>
  );
};

export default Poll;
