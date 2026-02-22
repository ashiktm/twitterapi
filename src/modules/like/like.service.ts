import CommentRepository from "../comment/comment.repository.js";
import LikeRepository from "../like/like.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";
import { ToggleLikeBody } from "./like.schema.js";
import { ILike } from "./like.model.js";
import { Types } from "mongoose";

export class LikeSerivce {
  likeRepository: LikeRepository;
  tweetRepository: TweetRepository;
  commentRepository: CommentRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike({ likable, onModel, user }: ToggleLikeBody & { user: string }) {
    let likeable;
    if (onModel === "Tweet") {
      likeable = await this.tweetRepository.getTweet(likable);
    } else if (onModel === "Comment") {
      likeable = await this.commentRepository.get(likable);
    }
    let exists = await this.likeRepository.findby({
      onModel: onModel,
      user: user as unknown as Types.ObjectId,
      likable: likable as unknown as Types.ObjectId,
    });
    if (exists && likeable) {
      console.log(exists);
      (likeable.likes as unknown as Types.DocumentArray<Types.ObjectId>).pull(exists.id);
      await likeable.save();
      await this.likeRepository.destroy(exists.id);
    } else if (likeable) {
      let newLike = await this.likeRepository.create({
        onModel: onModel,
        user: user as unknown as Types.ObjectId,
        likable: likable as unknown as Types.ObjectId,
      });
      console.log("newLike", newLike);
      likeable.likes.push(newLike.id as unknown as Types.ObjectId);
      await likeable.save();
    }

    return likeable;
  }
}
