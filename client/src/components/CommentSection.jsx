import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const CommentSection = ({ pollId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const tempComments = [
      { text: 'This is the first comment', isReply: false },
      { text: 'This is a reply', isReply: true },
      { text: 'Another comment', isReply: false },
    ];
    setComments(tempComments);

    // Join the room for the specific poll
    socket.emit('joinPoll', pollId);

    // Listen for new comments
    socket.on('newComment', (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    });

    return () => {
      socket.off('newComment');
    };
  }, [pollId]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      socket.emit('sendComment', { pollId, text: newComment, isReply: false });
      setNewComment('');
    }
  };

  return (
    <div className="p-6 border-t border-gray-200 bg-gray-100">
      <div className="max-h-80 overflow-y-auto flex flex-col-reverse">
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`flex mb-3 ${comment.isReply ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg ${comment.isReply ? 'bg-gray-300' : 'bg-blue-200'} max-w-xs shadow-md`}
            >
              {comment.text}
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
