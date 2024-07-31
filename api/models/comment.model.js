import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    comment: { type: String, required: true },
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    commentedAt: { type: Date, default: Date.now },
    isReply: { type: Boolean, default: false },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" , default: null},
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

// In this model, we define a schema for comments.
//  The schema contains the pollId, comment, commentedBy, commentedAt, isReply, and replyTo fields.