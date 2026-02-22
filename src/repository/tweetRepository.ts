import Tweet from "../models/tweet.js";
import CrudRepository from "./crudRepository.js";

export default class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
  async getAllTweet(query = {}) {
    try {
      const result = await this.model
        .find(query)
        .populate({
          path: "createdby",
          select: "username",
        })
        .populate([
          {
            path: "comments",
            populate: {
              path: "likes",
              select: "username user",
              populate: [{ path: "user", select: "username" }],
            },
          },
        ])
        .populate([
          {
            path: "comments",
            populate: {
              path: "comments",

              populate: { path: "user", select: "username" },
            },
          },
        ])
        .populate([
          {
            path: "comments",
            populate: {
              path: "comments",

              populate: { path: "comments", populate: { path: "user", select: "username" } },
            },
          },
        ])
        .populate([
          {
            path: "comments",
            populate: {
              path: "user",
              select: "username user",
            },
          },
        ])
        .populate({
          path: "likes",
          select: "user",
          populate: { path: "user", select: "username" },
        });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
  async getTweet(id) {
    try {
      const result = await this.model
        .findOne({ _id: id })
        .populate({
          path: "createdby",
          select: "username",
        })
        .populate({
          path: "comments",
          populate: [
            {
              path: "user",
              select: "username",
            },
            {
              path: "likes",
              select: "user",
              populate: { path: "user", select: "username" },
            },
          ],
        })
        .populate({
          path: "likes",
          select: "user",
          populate: { path: "user", select: "username" },
        });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
  async populateCommentsRecursively(comment) {
    if (comment.comments && comment.comments.length > 0) {
      const result = await comment
        .populate({
          path: "comments",
          populate: [
            {
              path: "likes",
              select: "username user",
              populate: {
                path: "user",
                select: "username",
              },
            },
            {
              path: "comments",
              populate: {
                path: "user",
                select: "username",
              },
            },
            {
              path: "user",
              select: "username user",
            },
          ],
        })
        .execPopulate();

      for (const subComment of comment.comments) {
        await this.populateCommentsRecursively(subComment);
      }
      return result;
    }
  }
}
