import HashtagRepository from "./hashtag.repository.js";

export class HashtagService {
    private hashtagRepository: HashtagRepository;

    constructor() {
        this.hashtagRepository = new HashtagRepository();
    }

    async getAllHashtags() {
        return await this.hashtagRepository.getAll();
    }

    async searchHashtagByName(name: string) {
        return await this.hashtagRepository.gethashtagByName(name);
    }
}

export const hashtagService = new HashtagService();
