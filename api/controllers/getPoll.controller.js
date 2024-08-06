import Poll from '../models/poll.model.js';
import PollLikes from '../models/pollLikes.model.js';
import Comment from '../models/comment.model.js';
import Vote from '../models/vote.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

// Get all polls
export const getPolls = async (req, res, next) => {
    try {
        const polls = await Poll.find();
        return res.status(200).json(polls);
    } catch (error) {
        next(error);
    }
};

// Get a poll by ID
export const getPoll = async (req, res, next) => {
    const { id } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid poll ID' });
    }

    try {
        const poll = await Poll.findById(id);
        if (!poll) {
            return next(errorHandler(404, 'Poll not found'));
        }
        return res.status(200).json(poll);
    } catch (error) {
        next(error);
    }
};

// Get polls created by a user
export const getCreatedPolls = async (req, res, next) => {
    const { userId } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const polls = await Poll.find({ createdBy: userId });
        return res.status(200).json(polls);
    } catch (error) {
        next(error);
    }
};

// Get polls answered by a user
export const getAnsweredPolls = async (req, res, next) => {
    const { userId } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const polls = await Poll.find({ 'votes.user': userId });
        return res.status(200).json(polls);
    } catch (error) {
        next(error);
    }
};

// Get polls liked by a user
export const getLikedPolls = async (req, res, next) => {
    const { userId } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const likedPolls = await PollLikes.find({ likedBy: userId }).populate('pollId');
        const polls = likedPolls.map(like => like.pollId);
        return res.status(200).json(polls);
    } catch (error) {
        next(error);
    }
};

// Get polls commented on by a user
export const getCommentedPolls = async (req, res, next) => {
    const { userId } = req.params;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const commentedPolls = await Comment.find({ commentedBy: userId }).populate('pollId');
        const polls = commentedPolls.map(comment => comment.pollId);
        return res.status(200).json(polls);
    } catch (error) {
        next(error);
    }
};
