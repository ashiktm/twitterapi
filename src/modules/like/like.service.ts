import CommentRepository from "../comment/comment.repository.js";
import LikeRepository from "../like/like.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";

export class LikeSerivce {
  likeRepository: LikeRepository;
  tweetRepository: TweetRepository;
  commentRepository: CommentRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike({ likable, onModel, user }: any) {
    let likeable;
    if (onModel === "Tweet") {
      likeable = await this.tweetRepository.getTweet(likable);
    } else if (onModel === "Comment") {
      likeable = await this.commentRepository.get(likable);
    }
    let exists: any = await this.likeRepository.findby({
      onModel: onModel,
      user: user,
      likable: likable,
    });
    if (exists && likeable) {
      console.log(exists);
      (likeable.likes as any).pull(exists.id);
      await likeable.save();
      await this.likeRepository.destroy(exists.id);
    } else if (likeable) {
      let newLike = await this.likeRepository.create({
        onModel: onModel,
        user: user,
        likable: likable,
      });
      console.log("newLike", newLike);
      likeable.likes.push(newLike.id as any);
      await likeable.save();
    }

    return likeable;
  }
}
