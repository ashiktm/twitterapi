import Hashtag from "../models/hastag.js";
import CrudRepository from "./crudRepository.js";
export default class hashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag);
    }
    async bulkCreate(data) {
        try {
            let hashtags = await Hashtag.insertMany(data);
            return hashtags;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async gethashtagByName(name) {
        try {
            let hashtag = await Hashtag.find({ text: name });
            return hashtag;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
