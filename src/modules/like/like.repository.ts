import Like from "../like/like.model.js";
import CrudRepository from "../../common/crud.repository.js";

export default class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }
  async finbyUserAndLikable(data) {
    try {
    } catch (error) {}
  }
}
