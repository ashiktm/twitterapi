import Comment from "../models/comment.js";
import CrudRepository from "./crudRepository.js";
export default class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
    async getComment(id) {
        try {
            const result = await this.model.findOne({ _id: id }).populate({
                path: "user",
                select: "username",
                // Specify the field(s) you want to populate
            });
            return result;
        }
        catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }
}
