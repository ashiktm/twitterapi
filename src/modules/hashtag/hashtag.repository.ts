import Hashtag, { IHashtag } from "../hashtag/hashtag.model.js";
import CrudRepository from "../../common/crud.repository.js";

export default class hashtagRepository extends CrudRepository<IHashtag> {
  constructor() {
    super(Hashtag);
  }
  async bulkCreate(data: Partial<IHashtag>[]) {
    try {
      let hashtags = await Hashtag.insertMany(data);
      return hashtags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async gethashtagByName(name: string | string[]) {
    try {
      let hashtag = await Hashtag.find({ text: name });
      return hashtag;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
