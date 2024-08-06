import Poll from '../models/poll.model.js';
import {errorHandler} from '../utils/error.js';
import mongoose from 'mongoose';

// Create a new poll
export const createPoll = async (req, res, next) => {
  const { question, options, createdBy} = req.body;

  // Validate input
  if (!question || !options || options.length < 2) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Create a new poll
  const newPoll = new Poll({
    question,
    options: options.map(option => ({ optionText: option.optionText, voteCount: 0 })),
    createdBy
  });
  try {
    // Save the poll to the database
    await newPoll.save();
    return res.status(201).json({ message: 'Poll created successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete a poll by ID
export const deletePoll = async (req, res, next) => {
    const { id } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid poll ID' });
    }

    try {
        const poll = await Poll.findByIdAndDelete(id);
        if (!poll) {
            return next(errorHandler(404, 'Poll not found'));
        }
        return res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
        next(error);
    }
};

