import hashtagRepository from "../hashtag/hashtag.repository.js";
import TweetRepository from "../tweet/tweet.repository.js";
import { IHashtag } from "../hashtag/hashtag.model.js";
import { Types } from "mongoose";

export default class TweetService {
  tweetRepository: TweetRepository;
  hashtagRepository: hashtagRepository;

  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new hashtagRepository();
  }

  async create(data: { content: string; user: { _id: string } }) {
    try {
      const content = data.content;

      console.log(data.user);
      console.log(content);
      const tag = content.match(/#+[a-zA-Z0-9(_)]+/g)?.map((tag: string) => tag.substring(1).toLowerCase()) || [];

      const tweet = await this.tweetRepository.create({ ...data, createdby: data.user._id as unknown as Types.ObjectId });
      const alreadyPresentTag = await this.hashtagRepository.gethashtagByName(tag as unknown as string);
      const alreadyPresentTagText = alreadyPresentTag.map((tag: IHashtag) => tag.text);
      let createTag: any = tag.filter((dat: string) => !alreadyPresentTagText.includes(dat));
      createTag = createTag.map((tag: string) => {
        return {
          text: tag,
          tweets: [tweet.id],
        };
      });

      await this.hashtagRepository.bulkCreate(createTag);
      //   if (alreadyPresentTag.length > 1)
      alreadyPresentTag.forEach(async (tag: IHashtag) => {
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
