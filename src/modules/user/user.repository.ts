import User from "../user/user.model.js";
import CrudRepository from "../../common/crud.repository.js";

export default class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
}
