import CommentRepository from "../comment/comment.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";
import { CreateCommentBody } from "./comment.schema.js";
import { Types } from "mongoose";

export default class CommentService {
  commentRepository: CommentRepository;
  tweetRepository: TweetRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async create(data: CreateCommentBody & { user: string; username: string }) {
    try {
      let comment = await this.commentRepository.create({ ...data, user: data.user as unknown as Types.ObjectId, commentable: data.commentable as unknown as Types.ObjectId });
      if (data.onModel === "Tweet") {
        let tweet = await this.tweetRepository.get(data.commentable);
        if (tweet) {
          tweet.comments.push(comment.id);
          await tweet.save();
        }
      } else if (data.onModel === "Comment") {
        let comment2 = await this.commentRepository.get(data.commentable);
        console.log("comment", comment2);
        if (comment2) {
          comment2.comments.push(comment.id);
          await comment2.save();
        }
      }
      const comment2 = await this.commentRepository.getComment(comment.id);
      return comment2;
      return comment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getComment(id: string) {
    const comment = await this.commentRepository.get(id);
    return comment;
  }
}
