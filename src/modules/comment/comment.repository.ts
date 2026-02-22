import Comment, { IComment } from "../comment/comment.model.js";
import CrudRepository from "../../common/crud.repository.js";

export default class CommentRepository extends CrudRepository<IComment> {
  constructor() {
    super(Comment);
  }
  async getComment(id: string) {
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
