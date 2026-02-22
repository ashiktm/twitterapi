import mongoose, { Document, Types, Model } from "mongoose";

export interface ILike extends Document {
  onModel: "Tweet" | "Comment";
  likable: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new mongoose.Schema<ILike>({
  onModel: {
    type: String,
    required: true,
    enum: ["Tweet", "Comment"],
  },
  likable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });
const Like = mongoose.model<ILike>("Like", likeSchema);

export default Like;
