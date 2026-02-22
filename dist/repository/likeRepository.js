import Like from "../models/like.js";
import CrudRepository from "./crudRepository.js";
export default class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }
    async finbyUserAndLikable(data) {
        try {
        }
        catch (error) { }
    }
}
