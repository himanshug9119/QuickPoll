import mongoose from "mongoose";

const commentLikesSchema = new mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likedAt: { type: Date, default: Date.now },
});

const commentLikes = mongoose.model("commentLikes", commentLikesSchema);
export default commentLikes;

