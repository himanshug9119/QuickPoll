import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
  const [step, setStep] = useState(1); // 1: Question, 2: Options
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
    e.preventDefault();
    const poll = { question, options };
    console.log(poll);
    axios.post('/api/polls', poll)
      .then((res) => {
        console.log(res.data);
        // Handle success (e.g., redirect or show success message)
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-8 border border-gray-300 rounded-lg bg-gray-50 shadow-lg">
      <h2 className="text-center text-3xl font-bold mb-6 text-blue-600">
        {step === 1 ? 'Create a Poll' : 'Enter Options'}
      </h2>

      {step === 1 ? (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
          <input
            type="text"
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-gray-300 rounded-md p-4 bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">Poll Question</h3>
            <p className="text-gray-700">{question}</p>
          </div>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={addOption}
              className="flex-1 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Option
            </button>
            <button
              type="submit"
              className="flex-1 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Poll
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default CreatePoll;
