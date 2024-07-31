import mongoose from "mongoose";

const pollLikesSchema = new mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likedAt: { type: Date, default: Date.now },
});

const PollLikes = mongoose.model("PollLikes", pollLikesSchema);
export default PollLikes;
// In this model, we define a schema for poll likes. The schema contains the pollId, likedBy, and likedAt fields. 
// The pollId field is a reference to the poll that the user liked.
// The likedBy field is a reference to the user who liked the poll. 
// The likedAt field stores the date and time when the like was created.
