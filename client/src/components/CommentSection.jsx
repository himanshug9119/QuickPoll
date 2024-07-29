import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import commentMockData from '../data/mockCommentsData'; // Import the mock data

const socket = io('http://localhost:3000'); // Replace with your server URL

const CommentSection = ({ pollId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const commentsEndRef = useRef(null);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Initialize with mock data
    setComments(commentMockData);

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
      const commentData = { 
        id: Date.now(), // Generate a unique ID
        text: newComment, 
        isReply: !!replyTo,
        parentId: replyTo,
        likes: 0,
        replies: [],
        username: 'current_user', // Replace with actual username if needed
        timestamp: new Date().toISOString()
      };
      socket.emit('sendComment', { pollId, ...commentData });
      setNewComment('');
      setReplyTo(null);
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
  };

  const handleLike = (commentId) => {
    const updateLikes = (comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies) {
          return { ...comment, replies: updateLikes(comment.replies) };
        }
        return comment;
      });

    setComments((prevComments) => updateLikes(prevComments));
  };

  const handleUsernameClick = (username) => {
    navigate(`/profile/${username}`); // Navigate to the user's profile page
  };

  const renderComments = (commentList, isReply = false) => {
    return commentList.map((comment) => (
      <div
        key={comment.id}
        className={`flex ${isReply ? 'ml-8 flex-row-reverse' : 'flex-row'} mb-4`}
      >
        <div className={`flex flex-col ${isReply ? 'items-end' : 'items-start'}`}>
          <div className="flex items-center mb-2">
            <div 
              className="font-semibold text-blue-600 cursor-pointer"
              onClick={() => handleUsernameClick(comment.username)}
            >
              {comment.username}
            </div>
            <div className="ml-2 text-gray-600 text-sm">
              {new Date(comment.timestamp).toLocaleString()}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isReply ? 'bg-gray-300' : 'bg-blue-200'} max-w-xs shadow-md`}>
            {comment.text}
            <div className="mt-2 flex items-center space-x-2">
              <button
                onClick={() => handleLike(comment.id)}
                className="text-gray-600 hover:text-blue-600"
              >
                {comment.likes} 👍
              </button>
              {!isReply && (
                <button
                  onClick={() => handleReply(comment.id)}
                  className="text-blue-500"
                >
                  Reply
                </button>
              )}
            </div>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {renderComments(comment.replies, true)}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 border-t border-gray-200 bg-gray-100">
      <div className="max-h-80 overflow-y-auto flex flex-col-reverse">
        {renderComments(comments)}
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
          {replyTo ? 'Reply' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
