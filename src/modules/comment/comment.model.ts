import mongoose, { Document, Types, Model } from "mongoose";

export interface IComment extends Document {
  content?: string;
  user?: any;
  onModel: "Tweet" | "Comment";
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  commentable: Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>({
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
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  commentable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
});
const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
