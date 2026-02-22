import mongoose, { Document, Types, Model } from "mongoose";

export interface ITweet extends Document {
  content: string;
  likes: Types.ObjectId[];
  noOfRetweet?: number;
  comments: Types.ObjectId[];
  createdby: Types.ObjectId;
}

const tweetSchema = new mongoose.Schema<ITweet>({
  content: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  noOfRetweet: {
    type: Number,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Tweet = mongoose.model<ITweet>("Tweet", tweetSchema);

export default Tweet;
