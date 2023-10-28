import CommentRepository from "../repository/comment-repository.js";
import TweetRepository from "../repository/tweetRepository.js";

export default class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async create(data) {
    try {
      let comment = await this.commentRepository.create(data);
      comment.user = data.username;
      if (data.onModel === "Tweet") {
        let tweet = await this.tweetRepository.get(data.commentable);
        tweet.comments.push(comment);
        await tweet.save();
      } else if (data.onModel === "Tweet") {
      }
      const comment2 = await this.commentRepository.getComment(comment.id);
      return comment2;
      return comment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getComment(id) {
    const comment = await this.commentRepository.get(id);
    return comment;
  }
}
