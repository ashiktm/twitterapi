import mongoose, { Document, Types, Model } from "mongoose";

export interface IComment extends Document {
  content?: string;
  user?: mongoose.Types.ObjectId;
  onModel: "Tweet" | "Comment";
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  commentable: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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
}, { timestamps: true });
const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
