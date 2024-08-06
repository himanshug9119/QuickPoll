import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PollList from '../components/PollList';
import { FaPoll, FaThumbsUp, FaCommentDots, FaQuestionCircle, FaEdit } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';

const Profile = () => {
  const [ownProfile, setOwnProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [pollType, setPollType] = useState('created'); // Default to created polls

  const { currentUser } = useSelector(state => state.user);
  const { username } = useParams();
  console.log('Username:', username);
  console.log('currentUser:', currentUser);
  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser && currentUser.username === username) {
        setOwnProfile(true);
        setUser(currentUser);
      } else {
        setOwnProfile(false);
        try {
          const res = await fetch(`/api/user/${username}`);
          if (!res.ok) {
            throw new Error('Error fetching profile data');
          }
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
  
    fetchProfileData();
  }, [currentUser, username]);

  const handlePollTypeChange = (type) => {
    setPollType(type);
  };

  const pollTypeTitles = {
    created: 'Created Polls',
    answered: 'Answered Polls',
    liked: 'Liked Polls',
    commented: 'Commented Polls',
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="relative">
        {/* Banner Image */}
        <div className="relative h-40 bg-gray-300">
          <img
            src={user?.banner || 'https://via.placeholder.com/1600x400'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          {/* Edit Icon */}
          <div className="absolute top-2 right-2">
            <Tooltip title="Edit Banner">
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                <FaEdit />
              </button>
            </Tooltip>
          </div>
          {/* Profile Picture */}
          <div className="absolute left-6 top-10">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        {/* User Details and Poll Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start mt-16 px-4">
          {/* User Details */}
          <div>
            <h1 className="text-3xl font-semibold">{user?.firstName} {user?.lastName}</h1>
            <p className="text-gray-600">@{user?.username}</p>
            <p className="text-sm text-gray-500 mt-2">{user?.bio || 'No bio available.'}</p>
          </div>
          {/* Poll Type Buttons */}
          <div className="flex flex-row sm:gap-2 mt-4 sm:mt-0 gap-2">
            <Tooltip title="Created Polls">
              <button
                onClick={() => handlePollTypeChange('created')}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  pollType === 'created' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaPoll />
              </button>
            </Tooltip>
            <Tooltip title="Answered Polls">
              <button
                onClick={() => handlePollTypeChange('answered')}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  pollType === 'answered' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaQuestionCircle />
              </button>
            </Tooltip>
            <Tooltip title="Liked Polls">
              <button
                onClick={() => handlePollTypeChange('liked')}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  pollType === 'liked' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaThumbsUp />
              </button>
            </Tooltip>
            <Tooltip title="Commented Polls">
              <button
                onClick={() => handlePollTypeChange('commented')}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  pollType === 'commented' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <FaCommentDots />
              </button>
            </Tooltip>
          </div>
        </div>
        {/* Poll List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">{pollTypeTitles[pollType]}</h2>
          {user && (
            <PollList type={pollType} userId={user._id} ownProfile={ownProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
