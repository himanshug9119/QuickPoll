import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUndoAlt, FaPlus, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { set } from 'mongoose';

const CreatePoll = () => {
  const [step, setStep] = useState(1); // 1: Question, 2: Options
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [deletedOptions, setDeletedOptions] = useState([]); // Track deleted options
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (options.length > 0 || question.trim() !== '') {
        event.preventDefault();
        event.returnValue = ''; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [options, question]);

  const addOption = () => {
    setOptions([...options, ''])
    setError(null); // Clear error if present
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setError(null); // Clear error if present
    setOptions(newOptions);
  };

  const handleDeleteOption = (index) => {
    if (options.length > 2) {
      const optionToDelete = options[index];
      if (optionToDelete.trim() !== '') {
        setDeletedOptions([...deletedOptions, optionToDelete]);
      }
      setOptions(options.filter((_, i) => i !== index));
      setError(null); // Clear error if present
    } else {
      setError('A poll must have at least two options.');
    }
  };

  const handleUndoDelete = () => {
    if (deletedOptions.length > 0) {
      const restoredOption = deletedOptions.pop();
      setOptions([...options, restoredOption]);
      setDeletedOptions([...deletedOptions]);
      setError(null); // Clear error if present
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.length < 2) {
      setError('A poll must have at least two options.');
      return;
    }
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
            <div key={index} className="flex items-center">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
              <button
                type="button"
                className={`ml-2 ${options.length === 2 ? 'text-gray-500' : 'text-red-500 hover:text-red-700'}`}
                onClick={() => handleDeleteOption(index)}
                title={options.length === 2 ? 'At least 2 options are required' : 'Delete Option'}
                disabled={options.length === 2}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
              title="Back"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={addOption}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              title="Add Option"
            >
              <FaPlus />
            </button>
            <button
              type="button"
              onClick={handleUndoDelete}
              className={`p-3 rounded-md transition-colors ${deletedOptions.length > 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500'}`}
              disabled={deletedOptions.length === 0}
              title="Undo Delete"
            >
              <FaUndoAlt />
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              title="Create Poll"
            >
              <FaCheck />
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default CreatePoll;
