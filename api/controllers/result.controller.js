import mongoose from "mongoose";
import Vote from "../models/vote.model.js";

// Get poll results by poll ID
export const getResult = async (req, res, next) => {
  const { pollId } = req.params;
  // Validate input
  if (!mongoose.Types.ObjectId.isValid(pollId)) {
    return res.status(400).json({ message: "Invalid poll ID" });
  }

  try {
    // Aggregate votes by optionId
    const results = await Vote.aggregate([
      { $match: { pollId: new mongoose.Types.ObjectId(pollId) } },
      { $group: { _id: "$optionId", totalVotes: { $sum: 1 } } },
      { $sort: { _id: 1 } }, // Sort by optionId
    ]);

    console.log(results || "No results found");
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
