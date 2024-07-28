import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState(null);
  
  const addOption = () => setOptions([...options, '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    // Call API to create poll
    e.preventDefault();
    const poll = { question, options };
    console.log(poll);
    axios.post('/api/polls', poll)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-center text-2xl font-semibold mb-4">Create Poll</h2>
      <input
        type="text"
        placeholder="Enter poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-md"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-md"
        />
      ))}
      <button
        onClick={addOption}
        className="w-full p-3 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Option
      </button>
      <button
        onClick={handleSubmit}
        className="w-full p-3 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Create Poll
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default CreatePoll;
