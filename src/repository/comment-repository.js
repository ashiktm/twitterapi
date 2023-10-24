import Comment from "../models/comment.js";
import CrudRepository from "./crudRepository.js";

export default class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
}
