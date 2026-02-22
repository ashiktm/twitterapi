import { Request, Response } from "express";
import TweetService from "../service/tweet-service.js";

const tweetService = new TweetService();

export const createTweet = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    data.user = req.user?._id;
    if (!data.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    console.log("bbbbb", req.user);
    let response = await tweetService.create(data);
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
    const data = req.params.id;
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
    const tag = req.params.tag;
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
