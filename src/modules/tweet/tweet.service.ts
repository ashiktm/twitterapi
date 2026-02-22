import hashtagRepository from "../hashtag/hashtag.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";

export default class TweetService {
  tweetRepository: TweetRepository;
  hashtagRepository: hashtagRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new hashtagRepository();
  }

  async create(data: any) {
    try {
      const content = data.content;

      console.log(data.user);
      console.log(content);
      const tag = content.match(/#+[a-zA-Z0-9(_)]+/g).map((tag: any) => tag.substring(1).toLowerCase());

      const tweet = await this.tweetRepository.create({ ...data, createdby: data.user._id });
      const alreadyPresentTag = await this.hashtagRepository.gethashtagByName(tag);
      const alreadyPresentTagText = alreadyPresentTag.map((tag: any) => tag.text);
      let createTag = tag.filter((dat: any) => !alreadyPresentTagText.includes(dat));
      createTag = createTag.map((tag: any) => {
        return {
          text: tag,
          tweets: [tweet.id],
        };
      });

      await this.hashtagRepository.bulkCreate(createTag);
      //   if (alreadyPresentTag.length > 1)
      alreadyPresentTag.forEach(async (tag: any) => {
        tag.tweets.push(tweet.id);
        console.log(tag);
        tag.save();
      });
      const tweet2 = await this.tweetRepository.getTweet(tweet.id);
      return tweet2;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getTweet(id: string) {
    const tweet = await this.tweetRepository.getTweet(id);
    return tweet;
  }
  async getTweetAll() {
    const tweet = await this.tweetRepository.getAllTweet();
    return tweet;
  }

  async getTweetsByHashtag(tagText: string) {
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
