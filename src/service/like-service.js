import CommentRepository from "../repository/comment-repository.js";
import LikeRepository from "../repository/likeRepository.js";
import TweetRepository from "../repository/tweetRepository.js";

export class LikeSerivce {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike({ modelId, modelType, userId }) {
    let likeable;
    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.get(modelId);
    } else if (modelType === "Comment") {
      likeable = await this.commentRepository.get(modelId);
    }
    let exists = await this.likeRepository.findby({
      onModel: modelType,
      user: userId,
      likable: modelId,
    });
    if (exists) {
      console.log(exists);
      likeable.likes.pull(exists.id);
      await likeable.save();
      await this.likeRepository.destroy(exists.id);
    } else {
      let newLike = await this.likeRepository.create({
        onModel: modelType,
        user: userId,
        likable: modelId,
      });
      console.log("newLike", newLike);
      likeable.likes.push(newLike);
      await likeable.save();
    }
  }
}
