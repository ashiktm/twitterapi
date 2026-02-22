import CommentRepository from "../comment/comment.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";

export default class CommentService {
  commentRepository: any;
  tweetRepository: any;

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
      } else if (data.onModel === "Comment") {
        let comment2 = await this.commentRepository.get(data.commentable);
        console.log("comment", comment2);
        comment2.comments.push(comment);
        await comment2.save();
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
