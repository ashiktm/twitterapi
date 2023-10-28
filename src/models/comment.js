import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  onModel: {
    type: String,
    required: true,
    enum: ["Tweet", "Comment"],
  },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
  commentable: {
    type: mongoose.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
