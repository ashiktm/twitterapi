import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
  noOfRetweet: {
    type: Number,
  },
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
