import Tweet from "../models/tweet.js";
import CrudRepository from "./crudRepository.js";

export default class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }
  async getAllTweet() {
    try {
      const result = await this.model.find({}).populate({
        path: "user",
        select: "username",
        // Specify the field(s) you want to populate
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
  async getTweet(id) {
    try {
      const result = await this.model.findOne({ _id: id }).populate({
        path: "user",
        select: "username",
        // Specify the field(s) you want to populate
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error;
    }
  }
}
