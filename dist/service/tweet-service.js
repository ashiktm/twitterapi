import hashtagRepository from "../repository/hashtagRepository.js";
import TweetRepository from "../repository/tweetRepository.js";
export default class TweetService {
    tweetRepository;
    hashtagRepository;
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new hashtagRepository();
    }
    async create(data) {
        try {
            const content = data.content;
            console.log(data.user);
            console.log(content);
            const tag = content.match(/#+[a-zA-Z0-9(_)]+/g).map((tag) => tag.substring(1).toLowerCase());
            const tweet = await this.tweetRepository.create({ ...data, createdby: data.user._id });
            const alreadyPresentTag = await this.hashtagRepository.gethashtagByName(tag);
            const alreadyPresentTagText = alreadyPresentTag.map((tag) => tag.text);
            let createTag = tag.filter((dat) => !alreadyPresentTagText.includes(dat));
            createTag = createTag.map((tag) => {
                return {
                    text: tag,
                    tweets: [tweet.id],
                };
            });
            await this.hashtagRepository.bulkCreate(createTag);
            //   if (alreadyPresentTag.length > 1)
            alreadyPresentTag.forEach(async (tag) => {
                tag.tweets.push(tweet.id);
                console.log(tag);
                tag.save();
            });
            const tweet2 = await this.tweetRepository.getTweet(tweet.id);
            return tweet2;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getTweet(id) {
        const tweet = await this.tweetRepository.getTweet(id);
        return tweet;
    }
    async getTweetAll() {
        const tweet = await this.tweetRepository.getAllTweet();
        return tweet;
    }
    async getTweetsByHashtag(tagText) {
        const formattedTag = tagText.startsWith("#")
            ? tagText.substring(1).toLowerCase()
            : tagText.toLowerCase();
        const hashtag = await this.hashtagRepository.gethashtagByName(formattedTag);
        if (!hashtag || hashtag.length === 0) {
            return [];
        }
        const tweetIds = hashtag[0].tweets;
        const tweets = await this.tweetRepository.getAllTweet({ _id: { $in: tweetIds } });
        return tweets;
    }
}
