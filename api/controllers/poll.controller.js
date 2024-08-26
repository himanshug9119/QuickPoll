import Poll from '../models/poll.model.js';
import {errorHandler} from '../utils/error.js';
import mongoose from 'mongoose';
import Vote from '../models/vote.model.js';
import PollLikes from '../models/pollLikes.model.js';
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
    const { pollId } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
        return res.status(400).json({ message: 'Invalid poll ID' });
    }

    try {
        const poll = await Poll.findByIdAndDelete(pollId);
        if (!poll) {
            return next(errorHandler(404, 'Poll not found'));
        }
        return res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// vote the poll with post request data will be voted by the user option choosen, poll id and like or not like 
export const votePoll = async (req, res, next) => {
  const { pollId, optionId, like, votedBy } = req.body;

  // Validate input
  if (!mongoose.Types.ObjectId.isValid(pollId)) {
    return res.status(400).json({ message: "Invalid poll ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(optionId)) {
    return res.status(400).json({ message: "Invalid option ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(votedBy)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Check if the poll and the selected option exist
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return next(errorHandler(404, "Poll not found"));
    }
    const option = poll.options.id(optionId);
    if (!option) {
      return next(errorHandler(404, "Option not found"));
    }

    // Check if the user has already voted in this poll
    const existingVote = await Vote.findOne({ pollId, votedBy });
    if (existingVote) {
      // Delete the existing vote
      await Vote.deleteOne({ _id: existingVote._id });
    }

    // Save the new vote
    const newVote = new Vote({
      pollId,
      votedBy,
      optionId,
    });
    await newVote.save();
    console.log(newVote);

    // If the user liked the poll, save the like
    if (like) {
      const existingLike = await PollLikes.findOne({
        pollId,
        likedBy: votedBy,
      });
      if (!existingLike) {
        const newLike = new PollLikes({
          pollId,
          likedBy: votedBy,
        });
        await newLike.save();
      }
    }

    return res.status(200).json({ message: "Vote submitted successfully" });
  } catch (error) {
    next(error);
  }
};
