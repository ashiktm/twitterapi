import mongoose, { Document, Types, Model } from "mongoose";

export interface IHashtag extends Document {
  text: string;
  tweets: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const hashtagSchema = new mongoose.Schema<IHashtag>({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
}, { timestamps: true });
const Hashtag = mongoose.model<IHashtag>("Hashtag", hashtagSchema);

export default Hashtag;
