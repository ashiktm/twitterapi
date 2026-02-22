import { Request, Response } from "express";
import TweetService from "../tweet/tweet.service.js";
import { CreateTweetBody } from "./tweet.schema.js";

const tweetService = new TweetService();

export const createTweet = async (req: Request<{}, {}, CreateTweetBody>, res: Response) => {
  try {
    let data: CreateTweetBody = req.body;
    const userId = req.user?._id?.toString();
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    console.log("bbbbb", req.user);
    let response = await tweetService.create({ content: data.content, user: { _id: userId } });
    return res.status(200).json({
      success: true,
      message: "data created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
export const getTweet = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const data = req.params.id as string;
    const response = await tweetService.getTweet(data);
    return res.status(200).json({
      success: true,
      message: "data fetched",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
export const getTweetAll = async (req: Request, res: Response) => {
  try {
    const response = await tweetService.getTweetAll();
    return res.status(200).json({
      success: true,
      message: "Tweets fetched successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};

export const searchTweetByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.params.tag as string;
    const response = await tweetService.getTweetsByHashtag(tag);
    return res.status(200).json({
      success: true,
      message: "Tweets fetched successfully by tag",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
