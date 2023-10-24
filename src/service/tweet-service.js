import hashtagRepository from "../repository/hashtagRepository.js";
import TweetRepository from "../repository/tweetRepository.js";

export default class TweetService {
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

      const tweet = await this.tweetRepository.create({ ...data, user: data.user._id });
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
      return tweet;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getTweet(id) {
    const tweet = await this.tweetRepository.get(id);
    return tweet;
  }
  async getTweetAll() {
    const tweet = await this.tweetRepository.getAllTweet();
    return tweet;
  }
}
