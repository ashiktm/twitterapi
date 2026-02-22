import CommentRepository from "../comment/comment.repository.js";
import LikeRepository from "../like/like.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";

export class LikeSerivce {
  likeRepository: any;
  tweetRepository: any;
  commentRepository: any;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike({ likable, onModel, user }) {
    let likeable;
    if (onModel === "Tweet") {
      likeable = await this.tweetRepository.getTweet(likable);
    } else if (onModel === "Comment") {
      likeable = await this.commentRepository.get(likable);
    }
    let exists = await this.likeRepository.findby({
      onModel: onModel,
      user: user,
      likable: likable,
    });
    if (exists) {
      console.log(exists);
      likeable.likes.pull(exists.id);
      await likeable.save();
      await this.likeRepository.destroy(exists.id);
    } else {
      let newLike = await this.likeRepository.create({
        onModel: onModel,
        user: user,
        likable: likable,
      });
      console.log("newLike", newLike);
      likeable.likes.push(newLike);
      await likeable.save();
    }

    return likeable;
  }
}
