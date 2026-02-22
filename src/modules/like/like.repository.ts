import Like, { ILike } from "../like/like.model.js";
import CrudRepository from "../../common/crud.repository.js";

export default class LikeRepository extends CrudRepository<ILike> {
  constructor() {
    super(Like);
  }
  async finbyUserAndLikable(data: Partial<ILike>) {
    try {
    } catch (error) { }
  }
}
